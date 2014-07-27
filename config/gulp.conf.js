'use strict';

module.exports = {
	connect: {
		root: ['./client'],
    	port: 8000,
    	livereload: true
	},
	paths: {
		conf: [
			'./gulpfile.js',
			'./config/gulp.conf.js',
			'./config/karma.conf.js'
		],
		karmaConf: './config/karma.conf.js',
		pkg: './package.json',
		index: './client/index.html',
		app: './client/app',
		server: './server/**/*',
		serverSpecs: './server/**/*.spec.js',
	    clientJS: [
	    	'!./client/**/*.spec.js',
	    	'!./client/app/templates.js',
	    	'!./client/bower_components/**/*.js',
	    	'./client/**/*.js'
	    ],
	    clientTest: [
	    	'!./client/bower_components/*',
	    	'./client/**/*.spec.js'
	    ],
	    clientTmpl: [
	    	'!./client/index.html',
	    	'./client/**/*.html'
	    ],
	    clientCSS: [
	    	'./client/app/**/*.css',
	    	'./client/components/**/*.css'
	    ],
	    clientImages: './client/assets/images/*',
	    vendorJS: [
	    	'!./client/bower_components/**/*.min.js',
	    	'!./client/bower_components/jquery/**/*.js',
	    	'!./client/bower_components/bootstrap/**/*.js',
	    	'!./client/bower_components/angular-scenario/*.js',
	    	'!./client/bower_components/angular-mocks/*.js',
	    	'!./client/bower_components/angular-ui-router/src/*.js',
	    	'./client/bower_components/**/*.js'
	    ],
	    vendorCSS: [
	    	'!./client/bower_components/**/*.min.css',
	    	'!./client/bower_components/bootstrap/dist/css/bootstrap-theme.css',
	    	'!./client/bower_components/angular/angular-csp.css',
	    	'./client/bower_components/**/*.css'
	    ],
	    dist: './dist',
	    distPublic: './dist/public',
	    distPublicApp: './dist/public/app',
	    distPublicHTML: './dist/public/**/*.html',
	    distPublicJS: './dist/public/**/*.js',
	    distPublicCSS: './dist/public/**/*.css',
	    distPublicImages: './dist/public/assets/images',
	    distServer: './dist/server'
	}
};