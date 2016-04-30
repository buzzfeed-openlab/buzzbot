
var express = require('express');
var app = express();

app.get('/hook/', function (req, res) {
  console.log('hook!');
  if (req.query['hub.verify_token'] === 'beepboopbop') {
    console.log('success!');
    res.send(req.query['hub.challenge']);
  }

  res.send('Error, wrong validation token');
});

app.listen(443);

