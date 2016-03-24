var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./routes/user');

// logs middleware
app.use(morgan('dev'));

// parses body of request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// users routes
app.use('/users', routes);

// error handling
app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(err.status || 500).end();
});

module.exports = app;