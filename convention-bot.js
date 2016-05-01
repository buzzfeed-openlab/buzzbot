
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


function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:config.token},
        method: 'POST',
        json: {
            recipient: {id:sender},
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

app.get('/hook/', function (req, res) {
    console.log('hook!');
    if (req.query['hub.verify_token'] === 'beepboopbop') {
        console.log('success!');
        res.send(req.query['hub.challenge']);
    }

    res.send('Error, wrong validation token');
});

app.post('/hook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
        if (event.message && event.message.text) {
            text = event.message.text;

            sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
        }
    }
    res.sendStatus(200);
});

app.listen(8000);
