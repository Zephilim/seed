var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var tslint = require("gulp-tslint");

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

///

// var tslint = require("gulp-tslint");
// var lintProject = ts.createProject('tsconfig.json');

// gulp.task("tslint", function() {
//     return gulp.src("./src/**/*.ts")
//         .pipe(tslint({
//             formatter: "verbose"
//         }))
//         .pipe(tslint.report());
//   }
// );

gulp.task("tslint", () =>
  gulp.src("./src/**/*.ts")
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
);

