
var express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request');

var configPath = (process.argv[2] || './config.json'),
    config = require(configPath);

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var users = {};

var initialQuestions = [
    {
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
    }
];

function handleIncomingMessage(token, event) {
    var sender = event.sender.id,
        text = event.message.text;

    if (!users[sender]) {
        users[sender] = {
            id: sender,
            messages: {}
        };

        startInitialConversation(token, sender);
    } else {
        console.log('WEVE SEEN THIS USER!');
    }
}

function handlePostBack(token, event) {

}

function startInitialConversation(token, user) {
    console.log('starting initial conversation with user:', user);

    for (var i = 0; i < initialQuestions.length; ++i) {
        var question = initialQuestions[i];
        sendTemplateMessage(token, user, question);
    }
}

function sendTextMessage(token, recipient, text) {
    messageData = {
        text:text
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:recipient},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function sendTemplateMessage(token, recipient, message) {
    delete message.id;

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: { id:recipient },
            message: message,
        }

    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
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
        } else {
            console.log('unknown event type: ', event);
        }
    }

    res.sendStatus(status);
});

app.listen(8000);
