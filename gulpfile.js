'use strict';

var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    karma = require('karma').server,
    config = require('./config/gulp.conf');
/**
 * bower
 * installs bower components
 * @param  {Function} cb 
 * @return {Function}
 */
function bower(cb) {
    return plugins.bower(null, cb);
}
/**
 * clean
 * removes the dist directory
 * @param  {Function} cb 
 * @return {Function}
 */
function clean(cb) {
    return rimraf.sync(config.paths.dist, cb);
}
/**
 * karmaTest
 * runs karma test 
 * @return {Function}
 */
function karmaTest(cb) {
    return karma.start({
        configFile: path.resolve(config.paths.karmaConf),
        singleRun: true
    }, cb);
}
/**
 * mochaTest
 * runs mocha test
 * @param  {Function} cb 
 * @return {Function}
 */
function mochaTest() {
    return gulp.src(config.paths.serverSpecs)
        .pipe(plugins.mocha({reporter: 'progress'}));

}
/** 
 * clientCSS
 * handles vendor prefixes for app css.
 * then concats, minifies, and copies css to dist directory.
 * @return {Function}
 */
function clientCSS() {
    return gulp.src(config.paths.clientCSS)
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(config.paths.distPublicApp));
}
/**
 * lintClientJS
 * lints all client js files
 * @return {Function}
 */
function lintClientJS() { 
    return gulp.src(config.paths.clientJS)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
}
/**
 * lintConf
 * lints all config js files
 * @return {Function}
 */
function lintConf() {
    return gulp.src(config.paths.conf)
        .pipe(plugins.jshint({node: true}))
        .pipe(plugins.jshint.reporter('default'));
}
/**
 * clientJS
 * handles angular dependency injection for app js files.
 * then concats, minifies, and copies js to dist directory.
 * @return {Function}
 */
function clientJS() {
    return gulp.src(config.paths.clientJS)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.paths.distPublicApp));
}
/**
 * clientTemplates
 * creates a angular template module from
 * app html templates. Then copies to dist directory.
 * @return {Function}
 */
function clientTemplates() {
    return gulp.src(config.paths.clientTmpl)
        .pipe(plugins.angularTemplatecache('templates.js', { standalone:true }))
        .pipe(gulp.dest(config.paths.distPublicApp));
}
/**
 * clientImages
 * minifies app images and copies to dist directory.
 * @return {Function}
 */
function clientImages() {
    return gulp.src(config.paths.clientImages)
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(config.paths.distPublicImages));
}
/**
 * clientIndex
 * handles angular attributes for html validation.
 * then, copies to dist directory.
 * @return {Function}
 */
function clientIndex() {
    return gulp.src(config.paths.index)
        .pipe(plugins.angularHtmlify())
        .pipe(plugins.htmlReplace({
            js: ['app/lib.js', 'app/app.js', 'app/templates.js'],
            css: ['app/lib.css', 'app/app.css']
        }))
        .pipe(gulp.dest(config.paths.distPublic));
}
/**
 * vendorCSS
 * concat and minify vendor css files,
 * then copy to dist directory.
 * @return {Function}
 */
function vendorCSS() {
    return gulp.src(config.paths.vendorCSS)
        .pipe(plugins.concat('lib.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(config.paths.distPublicApp));
}
/**
 * vendorJS
 * concat and minify vendor js files,
 * then copy to dist directory.
 * @return {Function}
 */
function vendorJS() {
    return gulp.src(config.paths.vendorJS)
        .pipe(plugins.concat('lib.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.paths.distPublicApp));
}
/**
 * moveServer
 * copies package.json and server into dist directory
 * @return {Function}
 */
function moveServer() {
    gulp.src(config.paths.pkg)
        .pipe(gulp.dest(config.paths.dist));
    return gulp.src(config.paths.server)
        .pipe(gulp.dest(config.paths.distServer));
}
/**
 * watchForChanges
 * watches files for changes
 * @return {Function}
 */
function watchForChanges() {
    gulp.watch([
        config.paths.distPublicHTML,
        config.paths.distPublicJS,
        config.paths.distPublicCSS
    ], function(event) {
        gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(config.paths.clientJS, ['clientJS']);
    gulp.watch(config.paths.clientTmpl, ['clientTemplates']);
    gulp.watch(config.paths.clientCSS, ['clientCSS']);
    gulp.watch(config.paths.index, ['clientIndex']);
    gulp.watch(config.paths.clientTest, ['test']);
}
/**
 * nodemon
 * starts express server in development mode and
 * restarts upon changes.
 * @return {[type]} [description]
 */
function nodemon() {
    plugins.nodemon({
        script: './server/app.js'
    })
    .on('restart', function() {
        console.log('Server restarted!');
    });
}
/**
 * createTask
 * creates a gulp task
 * @param  {Object} task 
 * @return {Function}
 */
function createTask(task) {
    if (!task.deps) return gulp.task(task.name, task.task);
    return gulp.task(task.name, task.deps, task.task);
}
// create gulp tasks
return [
    { name: 'bower', task: bower },
    { name: 'clean',  task: clean },
    { name: 'mocha', task: mochaTest },
    { name: 'karma', task: karmaTest},
    { name: 'test', deps: ['karma', 'mocha'], task: null },
    { name: 'clientCSS', task: clientCSS },
    { name: 'clientJS',  task: clientJS },
    { name: 'lintClientJS', task: lintClientJS },
    { name: 'lintConf', task: lintConf },
    { name: 'clientTemplates', task: clientTemplates },
    { name: 'clientIndex', task: clientIndex },
    { name: 'clientImages', task: clientImages },
    { name: 'vendorCSS', task: vendorCSS },
    { name: 'vendorJS', task: vendorJS },
    { name: 'server', task: moveServer },
    { name: 'watch', task: watchForChanges },
    { name: 'nodemon', task: nodemon },
    { name: 'dev', deps: ['bower', 'lintConf', 'lintClientJS', 'karma', 'nodemon', 'mocha', 'watch'], task: null },
    { name: 'build', deps: ['bower' ,'clean' ,'lintConf', 'lintClientJS' , 'karma', 'mocha', 'clientCSS', 'clientJS', 'clientTemplates', 'clientImages', 'clientIndex', 'vendorJS', 'vendorCSS', 'server'], task: null },
    { name: 'default', deps: ['bower' ,'clean' ,'lintConf', 'lintClientJS' , 'nodemon', 'karma', 'mocha', 'clientCSS', 'clientJS', 'clientTemplates', 'clientImages', 'clientIndex', 'vendorJS', 'vendorCSS', 'server', 'watch'], task: null }
]
.forEach(function(task) {
    return createTask(task);
});