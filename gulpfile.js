// including plugins
var gulp = require('gulp'),
	sass = require("gulp-sass"),
	browserify = require('gulp-browserify'),
	rename = require('gulp-rename');

gulp.task('default',  ['compile-sass', 'compile-browserify']);
gulp.task('watch',  ['compile-sass:watch', 'compile-browserify:watch']);


// task
gulp.task('compile-sass', function () {
    gulp.src([ './Scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./build/'));
});

gulp.task('compile-sass:watch', function () {
    gulp.watch('./Scss/*.scss', ['compile-sass']);
});

gulp.task('compile-browserify', function() {
    // Single entry point to browserify 
    gulp.src('./js/MainSite.js')
        .pipe(browserify())
        .pipe(rename('base.js'))
        .pipe(gulp.dest('./build'))
});

gulp.task('compile-browserify:watch', function () {
    gulp.watch('./js/*.js', ['compile-browserify']);
});