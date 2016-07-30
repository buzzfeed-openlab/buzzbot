
var path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser');


var app = express();

// Middleware -------

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

// Routes -------

app.get('/:userId', function (req, res) {
    var userId = req.params.userId;

    console.log('USER INFO REQUEST', userId);
    return res.status(200).json({
        first_name: 'user',
        last_name: userId,
        profile_pic: 'https://i.imgur.com/5tCHDqml.jpg',
        locale: 'earth',
        timezone: 1,
        gender: 'n/a'
    });
});

app.all('*', function (req, res) {
    console.log(req.body);
    return res.sendStatus(200);
});

// -------

console.log('listening...');
app.listen(9000);
