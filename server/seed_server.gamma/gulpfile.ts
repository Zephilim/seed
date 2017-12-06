import * as del from 'del';
import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import * as sourceMaps from 'gulp-sourcemaps';
import * as tsc from 'gulp-typescript';
import * as gulpMocha from 'gulp-mocha';


/**
* Remove dist directory.
*/
gulp.task("clean", (done) => {
return del(["dist"], done);
});

/**
* Copy start script.
*/
gulp.task("copy", () => {
return gulp.src(["src/**","!src/**/*.+(ts|json)"])
.pipe(gulp.dest("dist/"));
});

// /**
// * Copy public directory.
// */
// gulp.task("copy", () => {
//     return gulp.src("src/public/**")
//     .pipe(gulp.dest("dist/public"));
// });

/**
* Copy views directory.
*/
// gulp.task("cp" ,() => {
//     return gulp.src("src/views/*")
//     .pipe(gulp.dest("dist/views/"));
// });



/**
* Build the server.
*/
gulp.task("build:express", () => {
const project = tsc.createProject("src/tsconfig.json");
const result = gulp.src("src/**/*.ts")
.pipe(sourceMaps.init())
.pipe(project());
return result.js
.pipe(sourceMaps.write("dist",{addComment: true}))
.pipe(gulp.dest("dist"));
});

/**
 * Adding run test
 */
gulp.task("test:express", () => {
    gulp.src("dist/tests", { read: false })
    .pipe( gulpMocha());
});

/**
* Build the project.
*/
gulp.task("default", (done) => {
    runSequence("clean", "copy", "build:express", "test:express");
});

// /**
//  * Start Server
//  */
// gulp.task("server", (cb) => {
//     exec("node ./dist/bin/www", function (err, stdout, stderr) {
//       console.log(stdout);
//       console.log(stderr);
//       cb(err);
//     });
// })