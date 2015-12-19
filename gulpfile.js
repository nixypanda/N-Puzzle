'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // fires a local dev server
var open = require('gulp-open'); // opens URL in borowser

var browserify = require('browserify'); // bundles javascript files
var reactify = require('reactify'); // JSX -> JS
var babelify = require('babelify');
var source = require('vinyl-source-stream'); // use of text-stream in gulp
var concat = require('gulp-concat');

var uglify = require('gulp-uglify'); // js minification
var streamify = require('gulp-streamify');

/** @type {Configuration}
*[It contains basic variables that are required troughout the gulpfile]
*/
var config = {
    port: 9055,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            './src/**/*.css'
        ],
        dist: './dist',
        mainJS: './src/main.js'
    }
};

/** Creates a local dev server */
gulp.task('connect', function connectToServer() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        liverload: true
    });
});

/** Open the index html file. It also dependes on connect task.*/
gulp.task('open', ['connect'], function openTask() {
    gulp.src('dist/index.html')
    .pipe(open({
        uri: config.devBaseUrl + ':' + config.port + '/'
    }));
});

/** find and to the html dist folder then reload the connect task*/
gulp.task('html', function exeHTML() {
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

/** bundle all js to /scripts/bundle.js */
gulp.task('js', function bundleJS() {
    browserify(config.paths.mainJS)
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.min.js'))
    //    .pipe(streamify(uglify()))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

// bundle all css to /css/bundle.css
gulp.task('css', function bundleCSS() {
    gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('watch', function watchTask() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'open', 'watch']);
