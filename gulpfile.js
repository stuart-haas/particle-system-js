const gulp = require('gulp');
const uglify = require('gulp-uglify');
const strip = require('gulp-strip-comments');
const livereload = require('gulp-livereload');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

const JS_SRC = 'src/js/app/**/*.js';
const JS_DEST = 'public/js';

gulp.task('js', function(){
  return gulp.src(JS_SRC)
    .pipe(webpack(webpackConfig))
    .pipe(uglify())
    .pipe(strip())
    .pipe(gulp.dest(JS_DEST))
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(JS_SRC, ['js']);
});

gulp.task('default', ['js']);