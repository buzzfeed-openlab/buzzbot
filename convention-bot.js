
var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    uuid = require('node-uuid');

var configPath = (process.argv[2] || './config.json'),
    config = require(configPath);

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
            "text":"Why are you interested in the Republican convention?",
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
    "e42d0ffc-cdf2-41f8-a18d-988529d6b86f",
];

var messageTriggers = {
    "e42d0ffc-cdf2-41f8-a18d-988529d6b86f:in-town": ["482a57a7-b381-4db5-ab65-0d3e73d789c4"],
    "e42d0ffc-cdf2-41f8-a18d-988529d6b86f:delegate": ["677c795a-ea2a-4cd2-8add-180e4cb40d3f"],
    "e42d0ffc-cdf2-41f8-a18d-988529d6b86f:other-reason": ["9ce84a73-311c-453b-b140-aa6f0353025f"],
    "9ce84a73-311c-453b-b140-aa6f0353025f:remote": ["b5017034-8235-4cc5-9b1c-e7b942ff4d13"],
    "9ce84a73-311c-453b-b140-aa6f0353025f:other-reason": ["6fa03b19-28ae-4c7c-a7c0-e40e62b0478b"]
};

function handleIncomingMessage(token, event) {
    var sender = event.sender.id,
        text = event.message.text;

    if (!users[sender]) {
        users[sender] = {
            id: sender,
            messages: {},
            tags: []
        };

        startInitialConversation(token, sender);
    } else {
        console.log('user', sender, 'says:', text);
    }
}

function handlePostBack(token, event) {
    var sender = event.sender.id,
        payload = event.postback.payload;

    users[sender].tags.push(payload);

    var triggeredMessages = messageTriggers[payload] || [];
    for (var i = 0; i < triggeredMessages.length; ++i) {
        sendMessage(token, sender, messages[triggeredMessages[i]]);
    }
}

function startInitialConversation(token, user) {
    console.log('starting initial conversation with user:', user);

    for (var i = 0; i < initialMessages.length; ++i) {
        var message = messages[initialMessages[i]];
        sendMessage(token, user, message);
    }
}

function sendMessage(token, recipient, message) {
    // copy the message so that we can remove fields used locally
    var msg = Object.assign({}, message);
    delete msg.id;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: { id:recipient },
            message: msg,
        }

    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }

        // record that we sent the user this message
        users[recipient]['messages'][message.id] = {};
    });
}

app.get('/hook/', function (req, res) {
    if (req.query['hub.verify_token'] === config.verifyToken) {
        console.log('success, verified hook!');
        return res.send(req.query['hub.challenge']);
    }

    console.log('ERROR failed to verify hook...');
    return res.send('Error, wrong validation token');
});

app.post('/hook/', function (req, res) {
    var messaging_events = req.body.entry[0].messaging,
        status = 200;

    for (i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];

        if (event.message && event.message.text) {
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

    // give the message an id and save it
    // message.id = uuid.v4();
    messages[message.id] = message;

    for (var id in users) {
        sendMessage(config.pageToken, id, message);
    }

    res.sendStatus(200);
});

app.listen(8000);
