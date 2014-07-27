// Karma Configuration

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        '../client/bower_components/angular/angular.js',
        '../client/bower_components/angular-resource/angular-resource.js',
        '../client/bower_components/angular-mocks/angular-mocks.js',
        '../client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        '../client/bower_components/angular-ui-router/release/angular-ui-router.js',
        '../client/app/**/*.js',
        '../client/components/**/*.js',
        '../client/templates.js'
    ],
    exclude: [],
    reporters: ['progress', 'html'],
    htmlReporter: {
        outputDir: './karma_report'
    },
    port: 8080,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    autoWatchInterval: 100,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
