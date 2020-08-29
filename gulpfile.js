const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const strip = require('gulp-strip-comments');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');

const JS_SRC = 'src/js/app/**/*.js';
const JS_DEST = 'public';
const JS_MAPS = '/maps';

gulp.task('js', function(){
  return gulp.src(JS_SRC)
    .pipe(plumber({ errorHandler: function(err) {
      notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
      })(err);
      gutil.beep();
    }}))
    .pipe(webpack(webpackConfig))
    .pipe(sourcemaps.init())
    .pipe(strip())
    .pipe(uglify())
    .pipe(sourcemaps.write(JS_MAPS))
    .pipe(gulp.dest(JS_DEST))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(JS_SRC, ['js']);
});

gulp.task('default', ['js']);