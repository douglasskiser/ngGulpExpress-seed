'use strict';

module.exports = function(app) {

	app.use('/api/features', require('./api/features'));

	app.route('/*')
		.get(function(req, res) {
			res.sendfile(app.get('appPath') + '/index.html');
		});
};