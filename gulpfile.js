var gulp = require('gulp'),
  sass = require('gulp-sass'),
  compass = require('gulp-for-compass'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if');

var path = {
  JS: ['src/core/core-jquery.js', 'src/core/router.js', 'src/core/sandbox.js', 'src/modules/**/*.js', 'src/core/app.js'],
  MIN_OUT: 'build.min.js',
  DEST_SRC: 'src',
  DEST_BUILD: 'build'
};

gulp.task('js', function() {
  return gulp.src(path.JS)
    .pipe(concat(path.MIN_OUT))
    .pipe(uglify())
    .pipe(gulp.dest(path.DEST_BUILD + '/js'));
});

gulp.task('sass', function() {
  return gulp.src(path.DEST_SRC + '/sass/app.scss')
    .pipe(sass())
    .pipe(gulp.dest(path.DEST_BUILD + '/css'));
});

gulp.task('compass', function() {
	gulp.src(path.DEST_SRC + '/sass/*.scss')
		.pipe(compass({ sassDir: 'sass', cssDir: 'css', force: true }));
});

gulp.task('default', ['sass', 'js']);
//gulp.task('default', ['sass']);