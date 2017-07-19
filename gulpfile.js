'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var run = require('run-sequence');
var del = require('del');
var bs = require('browser-sync').create();

gulp.task('clean', function() {
  return del('build');
});

gulp.task('copy:html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('copy:fonts', function() {
  return gulp.src('src/fonts/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('normalize', function() {
  return gulp.src('normalize.css', {cwd: 'node_modules/normalize.css'})
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('normalize.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('style', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(bs.stream());
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('build', function(cb) {
  run(
    'clean',
    'copy:html',
    'normalize',
    'style',
    'copy:fonts',
    'images',
    'scripts',
    cb
  );
});

gulp.task('serve', function() {
  bs.init({
    server: 'build'
  });

  gulp.watch('src/sass/**/*.scss', ['style']);
  gulp.watch('src/*.html', ['copy:html', bs.reload]);
});
