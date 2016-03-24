var mongoose = require('mongoose');

// connects to local dbs
mongoose.connect('mongodb://localhost/gooroo');

// gets server from our server/index.js
var server = require('./server');

var PORT = 3000;

mongoose.connection.once('open', function () {
    server.listen(PORT, function () {
	    console.log('Server started on port ' + PORT.toString());
	});
});