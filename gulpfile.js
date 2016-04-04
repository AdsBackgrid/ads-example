'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

function getBrowserify() {
  // add custom browserify options here
  var customOpts = {
    entries: ['./lib/index.js'],
    debug: true
  };
  var opts = Object.assign({}, watchify.args, customOpts);
  return watchify(browserify(opts));
}

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', function() {
  return bundle(getBrowserify());
}); // so you can run `gulp js` to build the file

gulp.task('watch-js', function() {
  var b = getBrowserify();
  b.on('update', function() { bundle(b); }); // on any dep update, runs the bundler
  b.on('log', gutil.log); // output build logs to terminal
  return bundle(b);
});

gulp.task('default', ['js']);

function bundle(b) {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}
