'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    Config = require('./gulpfile.config');

var config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('lint', function () {
    return gulp.src(config.allTypeScript)
        .pipe(tslint({
            formatter: "prose"
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile', function () {
   
    var sourceTsFiles = [config.allTypeScript,                // path to typescript files
                         config.libraryTypeScriptDefinitions, // reference to library .d.ts files
                         config.appTypeScriptReferences];     // reference to app.d.ts files
    
    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           declarationFiles: false,
                           noResolve: true
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compiltion.
 */
gulp.task('clean', function () {
  var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                            config.sourceApp +'**/*.js',    // path to all JS files auto gen'd editor
                            config.sourceApp +'**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  return gulp.src(typeScriptGenFiles, {read: false})
      .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['lint', 'compile', 'refs']);
});

gulp.task('default', ['lint', 'compile', 'refs', 'watch']);
