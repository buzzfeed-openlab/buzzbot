
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import basicAuth from 'basic-auth';

import { Controller, pg, User, Tag } from './db';
import Commands from './src/commands';
import {
    sendMessage,
    sendMessageData,
    sendMessagesSequentially,
    fetchUserInfo,
    markSeen,
    updatePersistentMenu,
} from './src/messenger-interface';

const config = require('./config.js');

// clear user table
// User.destroy({ where: {} }).then(() => {
//     console.log('CLEARED USER TABLE');
// });

updatePersistentMenu(config.pageToken);

var app = express();

// Middleware -------

// always use https
app.use(function(req, res, next) {
    if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
        res.redirect('https://' + req.get('Host') + req.url);
    }
    else {
        next();
    }
});

// enable webpack hot reloading in development
if (config.env === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

function auth(req, res, next) {
    function unauthorized(res, user) {
        console.log('WARNING, unauthorized attempt by user:', user, 'to access route:', req.originalUrl);
        res.set('WWW-Authenticate', 'Basic');
        return res.sendStatus(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res, user);
    }

    if (user.name === config.auth.user && user.pass === config.auth.password) {
        return next();
    } else {
        return unauthorized(res, user);
    }
};

const adminPage = express.static(path.join(__dirname, 'client'));

// serve up the admin interface behind auth in production
if (config.env === 'development') {
    console.log('WARNING: NO AUTH FOR ADMIN PAGE 🔓');
    app.use('/admin', adminPage);
} else {
    console.log('🔒 Auth is enabled for admin page access')
    app.use('/admin', [ auth,  adminPage ]);
}

// body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// error handling
app.use(function (error, req, res, next) {
    if (error) {
        console.log('ERROR: ', error);
    } else {
        next();
    }
});

// -------

// Handler functions -------

function setContainsAll(set, items) {
    for (var i = 0; i < items.length; ++i) {
        if (!set.has(items[i])) {
            return false;
        }
    }

    return true;
}

function parseTag(tag) {
    var tagData = tag.split(':');
    return { mid: tagData[0], tag: tagData[1] };
}

function normalizeText(text) {
    return String(text).toUpperCase();
}

function handleIncomingMessage(token, event) {
    const userId = event.sender.id;

    Controller.getOrCreateUser(userId).spread((user, createdUser) => {
        const props = {
            text: event.message.text,
            attachments: event.message.attachments
        };

        !props.text && !props.attachments && console.log('WARNING, unknown event:', event, 'from user:', userId);

        if (createdUser) {
            startInitialConversation(token, userId);

            return Controller.createResponse(userId, props).then(() => { console.log('PERSISTED GREETING'); });
        }

        Controller.getMessageEventsForUser(userId).then((messageEvents) => {
            // look for messages expecting unstructured replies
            var message;
            for (var i = 0; i < messageEvents.length; ++i) {
                if (messageEvents[i].Message.unstructuredReply) {
                    message = messageEvents[i].Message;
                    props.messageId = message.id;
                    break;
                }
            }

            const normalizedText = normalizeText(props.text);

            // check for special types of responses (commands, polls)
            if (Commands[normalizedText]) {
                Commands[normalizedText](token, event, user);

            } else if (message && message.poll && props.text) {
                Controller.getUserResponsesToMessage(userId, message.id).then((responses) => {
                    // don't let users vote more than once
                    if (responses.length) {
                        return;
                    }

                    var pollData = JSON.parse(message.poll);

                    pollData[props.text] = (pollData[props.text] || 0) + 1;
                    message.update({ poll: JSON.stringify(pollData) });
                });
            }

            // persist the response
            Controller.createResponse(userId, props).then(() => {
                console.log('PERSISTED RESPONSE');
            });

            markSeen(token, userId);
        });
    });
}

function handlePostBack(token, event) {
    var userId = event.sender.id,
        payload = event.postback.payload;

    Controller.getOrCreateUser(userId).spread((user, createdUser) => {
        var tagData = parseTag(payload);

        // check for new users, start conversation and ignore initial postback
        if (createdUser) {
            startInitialConversation(token, userId);

            return Controller.createResponse(userId, {
                text: tagData.tag
            });
        }

        // check for paused, until the user resumes postbacks should not be recorded
        if (user.state === 'paused') {
            return;
        }

        // check for command postback
        if (tagData.mid === 'command') {
            const normalizedCommand = normalizeText(tagData.tag);

            if (Commands[normalizedCommand]) {
                Commands[normalizedCommand](token, event, user);

                Controller.createResponse(userId, {
                    text: tagData.tag
                });

                return;
            }
        }

        // otherwise, handle message postback
        Controller.getTag({ messageId: tagData.mid, tag: tagData.tag }).then((tag) => {
            user.addTag(tag);

            Controller.createResponse(userId, {
                text: tagData.tag,
                messageId: tagData.mid,
                tagId: tag.id
            });

            markSeen(token, userId);

            // trigger additional messages
            Controller.getMessagesForTriggerFromTag(tag).then((triggeredMessages) => {
                for (var i = 0; i < triggeredMessages.length; ++i) {
                    sendMessage(token, userId, triggeredMessages[i]);
                }
            });
        });
    });
}

function startInitialConversation(token, userId) {
    console.log('starting initial conversation with user:', userId);

    fetchUserInfo(token, userId);

    Controller.getInitialMessages().then((messages) => {
        sendMessagesSequentially(token, userId, messages);
    });
}

// -------

// Routes -------

app.get('/hook/', function (req, res) {
    if (req.query['hub.verify_token'] === config.verifyToken) {
        console.log('success, verified hook!');
        return res.send(req.query['hub.challenge']);
    }

    console.log('ERROR: failed to verify hook...');
    return res.send('Error, wrong validation token');
});

app.post('/hook/', function (req, res) {
    var status = 200;

    const entries = req.body.entry;

    for (var e = 0; e < entries.length; ++e) {
        var messaging_events = entries[e].messaging;

        for (var i = 0; i < messaging_events.length; i++) {
            var event = messaging_events[i];

            if (event.message) {
                handleIncomingMessage(config.pageToken, event);
            } else if (event.postback) {
                handlePostBack(config.pageToken, event);
            } else {
                console.log('unknown event type: ', event);
            }
        }
    }

    res.sendStatus(status);
});

config.env != 'development' && app.use('/messages/', auth);
app.post('/messages/', function (req, res) {
    if (!req.body.message) {
        return res.sendStatus(400);
    }

    const messageData = req.body.message;
    var unstructuredReply = req.body.unstructuredReply || false;
    var poll = req.body.poll ? '{}' : undefined;

    if (poll && !unstructuredReply) {
        console.log('received request to create poll message with unstructuredReply == false, setting it to true...');
        unstructuredReply = true;
    }

    Controller.createMessageAndTags(messageData, unstructuredReply, poll).then((message) => {
        console.log('CREATED MESSAGE:', message.get({plain: true}));
        res.status(200).json(message.get({ plain: true }));
    }).catch((err) => {
        console.log('ERROR creating message: ', err);
        res.status(500).json(err);
    });
});

config.env != 'development' && app.use('/send/', auth);
app.post('/send/', function (req, res) {
    if (!req.body.messageId) {
        return res.status(400).json({ message: '`messageId` must be specified in request' });
    }

    const requiredTags = req.body.tagIds.map((t) => +t);

    Controller.getAllActiveUserIds().then((users) => {
        Controller.getMessage(req.body.messageId).then((message) => {
            for (var i = 0; i < users.length; ++i) {
                const user = users[i];
                user.getTags().then((tags) => {
                    if (requiredTags && !setContainsAll(new Set(tags.map((t) => t.id)), requiredTags)) {
                        return;
                    }

                    sendMessage(config.pageToken, user.id, message);
                });
            }

            res.sendStatus(200);
        });
    }).catch((err) => {
        console.log('ERROR sending message: ', err);
        res.status(400).json(err);
    });
});

config.env != 'development' && app.use('/triggers/', auth);
app.post('/triggers/', function (req, res) {
    if (!(req.body.triggerTagId || (req.body.triggerTag && req.body.triggerMessageId)) || !req.body.messages) {
        return res.status(400).json({ message: '`triggerTagId` or `triggerTag` + `triggerMessageId` must be specified, along with `messages`' });
    }

    const tagData = {
        id: req.body.triggerTagId,
        messageId: req.body.triggerMessageId,
        tag: req.body.triggerTag
    }

    Controller.getTag(tagData).then((tag) => {
        Controller.getOrCreateTrigger(tag.id, req.body.messages).then((trigger) => {
            console.log('CREATED TRIGGER: ', trigger.get({plain: true}));
            res.sendStatus(200);
        });
    }).catch((err) => {
        console.log('ERROR creating trigger: ', err);
        res.status(500).json(err);
    });
});

// -------

// Websockets -------

const server = require('http').Server(app);
const io = require('socket.io')(server);

// auth for websockets
if (config.env != 'development') {
    io.use((socket, next) => {
        var user = basicAuth(socket.request);
        if (!user || user.name !== config.auth.user || user.pass !== config.auth.password) {
            return console.log('WARNING, unauthorized websocket connection attempt:', user);
        }
        next && next();
    });
}

io.on('connection', function (socket) {
    socket.on('get-responses', (options) => {
        Controller.getResponses({
            where: {},
            limit: options.limit || 300,
            order: '"updatedAt" DESC'
        }).then((responses) => {
            socket.emit('responses', responses.map((r) => r.get({ plain: true })));
        });
    });

    socket.on('get-messages', (options = {}) => {
        Controller.getMessages(options.messageIds).then((messages) => {
            socket.emit('messages', messages.map((m) => m.get({ plain: true })));
        });
    });

    socket.on('get-tags', (options) => {
        Controller.getTags(options).then((tags) => {
            socket.emit('tags', tags.map((t) => t.get({ plain: true })));
        });
    });

    socket.on('get-users', (options = {}) => {
        Controller.getUsers(options.userIds).then((users) => {
            socket.emit('users', users.map((u) => u.get({ plain: true })));
        });
    });

    socket.on('error', (err) => {
        console.log('SOCKET ERROR: ', err);
    });
});

pg.connect(function(err) {
    if(err) {
        console.log('ERROR connecting to database with pg: ', err);
    }
    pg.on('notification', function(msg) {
        const payloadData = msg.payload.split(',');

        if (msg.channel == 'responses') {
            Controller.getResponse(payloadData[2]).then((response) => {
                io.emit('new-response', response.get({ plain: true }));

                if (response.messageId) {
                    Controller.getMessage(response.messageId).then((message) => {
                        io.emit('messages', [ message.get({ plain: true }) ]);
                    });
                }
            });
        } else if (msg.channel == 'users') {
            Controller.getUser(payloadData[2]).then((user) => {
                io.emit('users', [ user.get({ plain: true }) ]);
            });
        } else {
            return console.log('UNKNOWN DB EVENT: ', msg);
        }
    });
    var responsesQuery = pg.query("LISTEN responses");
    var usersQuery = pg.query("LISTEN users");
});

// -------

console.log('STARTING SERVER 🎉');
console.log('env: ', config.env);
console.log('port: ', config.port);
console.log('-------');


server.listen(config.port);
