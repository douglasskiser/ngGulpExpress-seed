'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
	config = require('./config/environment'),
	app = express(),
	server = require('http').Server(app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;