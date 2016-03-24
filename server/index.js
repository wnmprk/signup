var http = require('http');
var server = http.createServer();

// require our express app from the app.js file.
var app = require('./app');

// every server request runs through express app
server.on('request', app);

module.exports = server;