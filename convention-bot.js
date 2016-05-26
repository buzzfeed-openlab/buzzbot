
var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request');

import { User, Controller } from './db';

const config = require('./config.js');

// var config = {
//     pageToken: process.env.pageToken,
//     verifyToken: process.env.verifyToken,
//     port: process.env.PORT
// }

// clear user table
// User.destroy({ where: {} }).then(() => {
//     console.log('CLEARED USER TABLE');
// });

var app = express();

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

var users = {};

var messages = {
    "e42d0ffc-cdf2-41f8-a18d-988529d6b86f": {
        "id": "e42d0ffc-cdf2-41f8-a18d-988529d6b86f",
        "attachment": {
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"Hi! Nice to meet you.\n\nWhy are you interested in the Republican convention?",
            "buttons":[
              {
                "title":"I'll be in Cleveland",
                "type":"postback",
                "payload":"e42d0ffc-cdf2-41f8-a18d-988529d6b86f:in-town"
              },
              {
                "title":"I'm a delegate",
                "type":"postback",
                "payload":"e42d0ffc-cdf2-41f8-a18d-988529d6b86f:delegate"
              },
              {
                "title":"For another reason",
                "type":"postback",
                "payload":"e42d0ffc-cdf2-41f8-a18d-988529d6b86f:other-reason"
              }
            ]
          }
        }
    },
    "482a57a7-b381-4db5-ab65-0d3e73d789c4": {
        "id": "482a57a7-b381-4db5-ab65-0d3e73d789c4",
        "text": "Great, we'll be on the ground as well. We'll push updates your way and reach out with any questions we have."
    },
    "677c795a-ea2a-4cd2-8add-180e4cb40d3f": {
        "id": "677c795a-ea2a-4cd2-8add-180e4cb40d3f",
        "text": "Sounds good, we'll push updates your way and reach out with any questions we have."
    },
    "9ce84a73-311c-453b-b140-aa6f0353025f": {
        "id": "9ce84a73-311c-453b-b140-aa6f0353025f",
        "attachment": {
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"Oh? Are you:",
            "buttons":[
              {
                "title":"Just interested",
                "type":"postback",
                "payload":"9ce84a73-311c-453b-b140-aa6f0353025f:remote"
              },
              {
                "title":"For another reason",
                "type":"postback",
                "payload":"9ce84a73-311c-453b-b140-aa6f0353025f:other-reason"
              }
            ]
          }
        }
    },
    "b5017034-8235-4cc5-9b1c-e7b942ff4d13": {
        "id": "b5017034-8235-4cc5-9b1c-e7b942ff4d13",
        "text": "Great, we'll push the latest your way"
    },
    "6fa03b19-28ae-4c7c-a7c0-e40e62b0478b": {
        "id": "6fa03b19-28ae-4c7c-a7c0-e40e62b0478b",
        "text": "Heh, sorry about that, could you tell us why you're interested in your own words?"
    }
};

var initialMessages = [
    1,
];

var messageTriggers = {
    "e42d0ffc-cdf2-41f8-a18d-988529d6b86f:in-town": ["482a57a7-b381-4db5-ab65-0d3e73d789c4"],
    "e42d0ffc-cdf2-41f8-a18d-988529d6b86f:delegate": ["677c795a-ea2a-4cd2-8add-180e4cb40d3f"],
    "e42d0ffc-cdf2-41f8-a18d-988529d6b86f:other-reason": ["9ce84a73-311c-453b-b140-aa6f0353025f"],
    "9ce84a73-311c-453b-b140-aa6f0353025f:remote": ["b5017034-8235-4cc5-9b1c-e7b942ff4d13"],
    "9ce84a73-311c-453b-b140-aa6f0353025f:other-reason": ["6fa03b19-28ae-4c7c-a7c0-e40e62b0478b"]
};

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
            startInitialConversation(token, userId);
        }

        const props = {};

        if (text) {
            //sendMessage(token, userId, { id: 0, text: 'DEBUG: ' + text });
            props.text = text;
        }

        if (attachments) {
            props.attachments = attachments;

            for (var i = 0; i < attachments.length; ++i) {
                var attachment = attachments[i];

                //sendMessage(token, userId, { id: 0, text: 'DEBUG: ' + attachment.payload.url });
            }

        }

        if (!text && !attachments) {
            console.log('user:', userId, 'sent event:', event);
        }

        Controller.createResponse(userId, props).then(() => {
            console.log('PERSISTED RESPONSE');
        });
    });
}

function handlePostBack(token, event) {
    var userId = event.sender.id,
        payload = event.postback.payload;

    Controller.getUser(userId).then((user) => {
        var tagData = parseTag(payload);

        Controller.getMessagesForTrigger(tagData.mid, tagData.tag).then((triggeredMessages) => {
            for (var i = 0; i < triggeredMessages.length; ++i) {
                sendMessage(token, userId, triggeredMessages[i]);
            }
        });
    });
}

function startInitialConversation(token, userId) {
    console.log('starting initial conversation with user:', userId);

    Controller.getMessages(initialMessages).then((messages) => {
        for (var i = 0; i < messages.length; ++i) {
            sendMessage(token, userId, messages[i]);
        }
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

    return sendMessageData(token, recipient, messageData);
}

function sendMessageData(token, recipient, messageData) {
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
        // users[recipient]['messages'][message.id] = { responses: [] };
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
    var messaging_events = req.body.entry[0].messaging,
        status = 200;

    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];

        if (event.message) {
            handleIncomingMessage(config.pageToken, event);
        } else if (event.postback) {
            handlePostBack(config.pageToken, event);
        } else {
            console.log('unknown event type: ', event);
        }
    }

    res.sendStatus(status);
});

app.post('/messages/', function (req, res) {
    if (!req.body.message) {
        return res.sendStatus(400);
    }

    var message = req.body.message;

    Controller.createMessage(message).then((message) => {
        console.log('CREATED MESSAGE:', message.get({plain: true}));
        res.status(200).json(message.get({ plain: true }));
    }).catch((err) => {
        console.log('ERROR creating message: ', err);
        res.status(500).json(err);
    });
});

app.post('/send', function (req, res) {
    if (!req.body.messageId || !messages[req.body.messageId]) {
        return res.sendStatus(400);
    }

    var message = messages[req.body.messageId];
    for (var id in users) {
        sendMessageData(config.pageToken, id, message);
    }

    res.sendStatus(200);
});

console.log('STARTING with config:');
console.log(config);

app.listen(config.port);
