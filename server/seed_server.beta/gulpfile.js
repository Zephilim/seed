var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var reporter = ts.reporter.longReporter();

var tsProject = ts.createProject('tsconfig.json', reporter);

gulp.task('build', function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('release/js'))
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.ts', ['build']);
});



