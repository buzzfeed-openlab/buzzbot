
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import basicAuth from 'basic-auth';

import { Controller, pg, User, Tag } from './db';
import { sendMessage, sendMessageData } from './src/send-message';
import Commands from './src/commands';

const config = require('./config.js');

// clear user table
// User.destroy({ where: {} }).then(() => {
//     console.log('CLEARED USER TABLE');
// });

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
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic');
        return res.sendStatus(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === config.auth.user && user.pass === config.auth.password) {
        return next();
    } else {
        return unauthorized(res);
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

function handleIncomingMessage(token, event) {
    const userId = event.sender.id;

    Controller.getOrCreateUser(userId).spread((user, created) => {
        if (created) {
            fetchUserInfo(token, userId);
            startInitialConversation(token, userId);
        }

        const props = {
            text: event.message.text,
            attachments: event.message.attachments
        };

        if (!props.text && !props.attachments) {
            console.log('WARNING, unknown event. User:', userId, 'Sent event:', event);
        }

        Controller.getMessageEventsForUser(userId).then((messageEvents) => {
            // look for expected unstructured replies
            for (var i = 0; i < messageEvents.length; ++i) {
                if (messageEvents[i].Message.unstructuredReply) {
                    props.messageId = messageEvents[i].Message.id;
                    break;
                }
            }

            // look for command words
            if (!created) {
                const normalizedText = String(props.text).toUpperCase();
                Commands[normalizedText] && Commands[normalizedText](token, event, user);
            }

            // persist the response
            Controller.createResponse(userId, props).then(() => {
                console.log('PERSISTED RESPONSE');
            });
        });
    });
}

function handlePostBack(token, event) {
    var userId = event.sender.id,
        payload = event.postback.payload;

    Controller.getUser(userId).then((user) => {
        if (user.state === 'paused') {
            // until the user resumes, postbacks should not be recorded
            return;
        }
        var tagData = parseTag(payload);

        Controller.getTag({ messageId: tagData.mid, tag: tagData.tag }).then((tag) => {
            // associate the tag with the user
            user.addTag(tag);

            // save the response
            Controller.createResponse(userId, {
                text: tagData.tag,
                messageId: tagData.mid,
                tagId: tag.id
            });

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

    Controller.getInitialMessages().then((messages) => {
        for (var i = 0; i < messages.length; ++i) {
            sendMessage(token, userId, messages[i]);
        }
    });
}

function fetchUserInfo(token, userId, attemptsToMake = 5) {
    var userInfoUrl = `https://graph.facebook.com/v2.6/${userId}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${token}`

    request(userInfoUrl, function(err, response, body) {
        if (err) {
            console.log('ERROR fetching user info for ' + userId + ', attemptsRemaining ' + attemptsToMake + ': ', err);
            if (attemptsToMake >= 1) {
                fetchUserInfo(token, userId, attemptsToMake - 1);
            }
            return;
        }

        body = JSON.parse(body);

        const props = {
            firstName: body.first_name,
            lastName: body.last_name,
            profilePic: body.profile_pic,
            locale: body.locale,
            timezone: body.timezone,
            gender: body.gender
        };

        Controller.updateUser(userId, props);
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

app.post('/messages/', function (req, res) {
    if (!req.body.message) {
        return res.sendStatus(400);
    }

    const messageData = req.body.message;
    const unstructuredReply = req.body.unstructuredReply || false;

    Controller.createMessageAndTags(messageData, unstructuredReply).then((message) => {
        console.log('CREATED MESSAGE:', message.get({plain: true}));
        res.status(200).json(message.get({ plain: true }));
    }).catch((err) => {
        console.log('ERROR creating message: ', err);
        res.status(500).json(err);
    });
});

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
        } else {
            return console.log('UNKNOWN DB EVENT: ', msg);
        }
    });
    var query = pg.query("LISTEN responses");
});

// -------

console.log('STARTING SERVER 🎉');
console.log('env: ', config.env);
console.log('port: ', config.port);
console.log('-------');


server.listen(config.port);
