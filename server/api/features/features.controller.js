'use strict';

exports.index = function(req, res) {
	res.json([
		{ name: 'AngularJS' },
		{ name: 'Bootstrap' },
		{ name: 'UI Bootstrap' },
		{ name: 'UI Router' },
		{ name: 'Karma' }
	]);
};