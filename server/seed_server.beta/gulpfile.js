var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
del = require('del');

var reporter = ts.reporter.longReporter();
var tsProject = ts.createProject('tsconfig.json', reporter);

gulp.task('clean', function (cb) {
  del(['./release/js/*.*', './release/maps/*.*']);
  return cb();
});

gulp.task('build', ['clean'], function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('release/js'));
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.ts', ['build']);
});



