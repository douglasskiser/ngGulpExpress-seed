'use strict';

var path = require('path');

module.exports = {
	root: path.normalize(__dirname + '/../../..'),
	port: process.env.PORT || 9000
};