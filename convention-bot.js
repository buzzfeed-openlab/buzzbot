
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import request from 'request';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import { Controller, pg, User, Tag } from './db';

const config = require('./config.js');

// clear user table
// User.destroy({ where: {} }).then(() => {
//     console.log('CLEARED USER TABLE');
// });

var app = express();

app.use(function(req, res, next) {
    if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
        res.redirect('https://' + req.get('Host') + req.url);
    }
    else
        next();
});

if (config.env == 'development') {
    const compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}

// serve up the admin interface
app.use('/admin', express.static(path.join(__dirname, 'client')));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (error, req, res, next) {
    console.log('called');
  if (error instanceof SyntaxError) {
    console.log('ERROR: ', error);
    sendError(res, 'myCustomErrorMessage');
  } else {
    next();
  }
});

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
    const userId = event.sender.id,
        text = event.message.text,
        attachments = event.message.attachments;

    Controller.getOrCreateUser(userId).spread((user, created) => {
        if (created) {
            fetchUserInfo(token, userId);
            startInitialConversation(token, userId);
        }

        const props = {};

        if (text) {
            props.text = text;
        }

        if (attachments) {
            props.attachments = attachments;

            for (var i = 0; i < attachments.length; ++i) {
                var attachment = attachments[i];
            }
        }

        if (!text && !attachments) {
            console.log('user:', userId, 'sent event:', event);
        }

        Controller.getMessageEventsForUser(userId).then((messageEvents) => {
            for (var i = 0; i < messageEvents.length; ++i) {
                if (messageEvents[i].Message.unstructuredReply) {
                    props.messageId = messageEvents[i].Message.id;
                    break;
                }
            }

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

function sendMessage(token, recipient, message) {
    var messageData = JSON.parse(message.data);

    // special case for template messages so that we have more info when we get
    // a postback from facebook
    if (messageData.attachment && messageData.attachment.payload && messageData.attachment.payload.buttons) {
        var buttons = messageData.attachment.payload.buttons;
        for (var i = 0; i < buttons.length; ++i) {
            buttons[i].payload = message.id + ':' + buttons[i].payload;
        }
    }

    return sendMessageData(token, recipient, message.id, messageData);
}

function sendMessageData(token, recipient, messageId, messageData) {
    // TODO: CHECK TO SEE IF THIS MESSAGE HAS BEEN SENT TO THIS USER BEFORE

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token:token },
        method: 'POST',
        json: {
            recipient: { id:recipient },
            message: messageData,
        }

    }, function(error, response, body) {
        if (error) {
            console.log('ERROR: sending message: ', error);
        } else if (response.body.error) {
            console.log('ERROR: ', response.body.error);
        }

        // record that we sent the user this message
        Controller.createMessageEvent(recipient, messageId);
    });
}

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

    const userQueryOptions = {
        attributes: ['id'],
    }

    Controller.getUsers(userQueryOptions).then((users) => {
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

// set up websockets
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

console.log('STARTING with config:');
console.log(config);

server.listen(config.port);
