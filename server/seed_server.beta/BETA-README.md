
# Introduction

This project starts with the tutorial at https://www.npmjs.com/package/gulp-typescript.

(Changes being performed on *beta* branch).

## Prerequisites

The folloing are assumed to have been completed as performed in seed_server.alpha:

  :o: Gulp cli already installed gloablly

  :o: Workspace directory :open_file_folder: *./seed_server* already created

  :o: .js and .map files hidden from VSC

  :o: .gitignore file already added

## Creating the project skeleton

Create the project :open_file_folder: *seed_server.beta* directory

Directory structure now looks like this:

```
λ ~/dev/github/seed/ tree -d
.
└── server
    └── seed_server.beta

```

## Initialise project

Same as in *seed_server.alpha*.

## Install dev dependencies

  λ npm install typescript gulp gulp-typescript --save-dev

```
λ ~/dev/github/seed/server/seed_server.beta/ beta* npm install typescript gulp gulp-typescript --save-dev
npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN seed_server.beta@1.0.0 No description
npm WARN seed_server.beta@1.0.0 No repository field.

+ gulp@3.9.1
+ gulp-typescript@3.2.3
+ typescript@2.6.1
added 241 packages in 30.236s
λ ~/dev/github/seed/server/seed_server.beta/ beta* 
```

## Basic usage

Create gulpfile containing the following code:

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
 
gulp.task('default', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('built/local'));
});
```

Points of note

  :o: Source files are inlined here and defined with *src()*

  :o: No external typescript is required. The typescript config is inlined inside the "ts" pipe ie:

```javascript
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'output.js'
        }))
```

  :o: The "ts" is what invokes the typescript compiler

  :o: The output of the typescript compiler is piped to the directory "built/local"

  :o: The resultant javascript code is combined into a single file called *output.js*.

  :o: A single default task is defined, which is invoked if none is specified to teh gulp command line.

We need some source code to test this task with, so we'll use the same source as that in *seed_server.alpha* ie we have a src folder containing *main.ts* and *greet.ts*.

greet.ts:

```javascript
export function sayHello(name: string) {
  return `Hello from ${name}`;
}
```

main.ts:

```javascript
import { sayHello } from "./greet";
console.log(sayHello("TypeScript"));
```

So running the default task on this source code results in the following:

```
λ ~/dev/github/seed/server/seed_server.beta/ beta* gulp
[21:29:04] Using gulpfile ~/dev/github/seed/server/seed_server.beta/gulpfile.js
[21:29:04] Starting 'default'...
src/greet.ts(1,17): error TS6131: Cannot compile modules using option 'outFile' unless the '--module' flag is 'amd' or 'system'.
[21:29:06] TypeScript: 1 semantic error
[21:29:06] TypeScript: emit succeeded (with errors)
[21:29:06] Finished 'default' after 1.11 s
λ ~/dev/github/seed/server/seed_server.beta/ beta* 
```

So we have an error because the *outFile* option :thumbsdown:. So for now let's remove this and re-run:

```
λ ~/dev/github/seed/server/seed_server.beta/ beta* gulp
[21:48:20] Using gulpfile ~/dev/github/seed/server/seed_server.beta/gulpfile.js
[21:48:20] Starting 'default'...
[21:48:21] Finished 'default' after 1.13 s
λ ~/dev/github/seed/server/seed_server.beta/ beta* 
```

... and greet.ts and main.ts were generated in *./built/local/*. This works :thumbsup:

## Task to generate both javascript and typescript definition files

This is the gulpfile:

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
 
gulp.task('scripts', function() {
    var tsResult = gulp.src('lib/**/*.ts')
        .pipe(ts({
            declaration: true
        }));
 
    return merge([
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    ]);
});
```

First need to install the dev dependency *merge2*

  λ npm install merge2 --save-dev

```
λ ~/dev/github/seed/server/seed_server.beta/ beta* npm install merge2 --save-dev
npm WARN seed_server.beta@1.0.0 No description
npm WARN seed_server.beta@1.0.0 No repository field.

+ merge2@1.2.0
added 1 package in 5.066s
λ ~/dev/github/seed/server/seed_server.beta/ beta* 
```

Points of note

  :o: tsResult is a stream containing the result of compiling the typescript.

  :o: there are substreams off tsResult, namely js & dts.
  
  :o: use merge2 so this task is finished when the IO of both operations is done

  :o: the *declaration* set to true generates typescript definition files (.d.ts)

  :o: For a server seed project, there is little value in emitting typescript definition files so this will be discarded from the solution.

  :o: I just noticed that the tutorial has changed the *src* directory from "src/**/*.ts" to "lib/**/*.ts" for no real benefit, so to get this to work properly, this changed will be reverted. (Without reverting this change, nothing is generated because there is no source code in "lib/**/*.ts").

  λ gulp scripts

λ ~/dev/github/seed/server/seed_server.beta/ beta* gulp scripts
[22:55:48] Using gulpfile ~/dev/github/seed/server/seed_server.beta/gulpfile.js
[22:55:48] Starting 'scripts'...
[22:55:49] Finished 'scripts' after 1.17 s
λ ~/dev/github/seed/server/seed_server.beta/ beta* 


## Incremental compilation

Using the following gulpfile:

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
 
var tsProject = ts.createProject({
    declaration: true
});
 
gulp.task('scripts', function() {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(tsProject());
 
    return merge([
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    ]);
});
 
gulp.task('watch', ['scripts'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
});
```

This means we can now make changes and as soon as a watched file changes, transpilation is triggered and theoretically will complete much faster...

  λ gulp watch

```
λ ~/dev/github/seed/server/seed_server.beta/ beta* gulp watch
[11:27:49] Using gulpfile ~/dev/github/seed/server/seed_server.beta/gulpfile.js
[11:27:49] Starting 'scripts'...
[11:27:50] Finished 'scripts' after 1.02 s
[11:27:50] Starting 'watch'...
[11:27:50] Finished 'watch' after 6.63 ms
```

The project (created from *ts.createProject*), must be created from outside the task; you can't use the same poject object in multiple tasks. The task named "scripts" doesn't make sense, so this will be named build instead.

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject({
  declaration: true
});

gulp.task('build', function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(tsProject());

  return merge([
    tsResult.dts.pipe(gulp.dest('release/definitions')),
    tsResult.js.pipe(gulp.dest('release/js'))
  ]);
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.ts', ['build']);
});
```

# Using tsconfig.json

I think separating the typescript outside of the gulp file is preferable; this means if e need to we can still invoke the typescript transpiler (tsc) on the command line and share the same config with gulp tasks:

```javascript
var tsProject = ts.createProject('tsconfig.json');
```

From within a gulp task, it may be required to override an option setting defined in the typescript config and this can be achieved as follows:

```javascript
var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });
```

So we change our gulp tasks accordingly. At this point, its not envisaged that we'll need typescript definitions so this will be omitted, for the sake of simplicity. Generating resultant javascript in a *release* directory will also be retained.

gulpfile.js:

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function () {
  var tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('release/js'))
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.ts', ['build']);
});
```

tsconfig.js:

```javascript
{
    "files": [
      "./src/**/*.ts"
    ],
  "compilerOptions": {
    "noImplicitAny": true,
    "target": "es5"
  }
}
```

## Generating source maps


First install gulp-sourcemaps

```
λ ~/dev/github/seed/server/seed_server.beta/ beta* npm install gulp-sourcemaps --save-dev
npm WARN seed_server.beta@1.0.0 No description
npm WARN seed_server.beta@1.0.0 No repository field.

+ gulp-sourcemaps@2.6.1
added 30 packages, removed 1 package and updated 1 package in 24.278s
λ ~/dev/github/seed/server/seed_server.beta/ beta* 
```

```javascript
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
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('release/js'))
});

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.ts', ['build']);
});
```

Now, the source maps are added to the resultant javascript files.

Reference: :link: *https://github.com/gulp-sourcemaps/gulp-sourcemaps*

But, to write the source maps to external files, we need to pass in a relative path to *sourcemaps.write()*:

We can load existing source maps, as described by the reference shown above, but it does not explain what's the use of loading them, so this we will come back to this at a later stage since it is not currently known what the value of this is.

```javascript
  return tsResult.js
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('release/js'))
```
## Reporters

Add a reporter as follows:

```javascript
var reporter = ts.reporter.longReporter();
var tsProject = ts.createProject('tsconfig.json', reporter);  // <--- pass in a reporter
```

Everything at *https://www.npmjs.com/package/gulp-typescript* has been added to the project, but there are a few additional things to add ...

## Add a delete task

To ensure the output directory is cleaned before each build, we need to use *del* to remove the contents of the prior to the build.

Reference: :link: *https://gulpjs.org/recipes/delete-files-folder*

First install del

  λ npm install del --save-dev

```
λ ~/dev/github/seed/server/seed_server.beta/ beta* npm install del --save-dev
npm WARN seed_server.beta@1.0.0 No description
npm WARN seed_server.beta@1.0.0 No repository field.

+ del@3.0.0
added 19 packages in 5.331s
λ ~/dev/github/seed/server/seed_server.beta/ beta* 
```

```javascript
del = require('del');

gulp.task('clean', function() {
    return del(['./release/js/*.*'])
});
```

... then add it as a dependency to the build task

```javascript
gulp.task('build', ['clean'], function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('release/js'))
});
```

## Running tasks in a series

The previous section illustrated how to use a clean task to delete the contents of an output directory prior to completing the build. It turns out, this has not quite been implmented properly, because of the way gulp executes tasks. When tasks are specified as dependencies, by default the gulp will try and running all the tasks in parallel. This means that there is no guarantee that the delete has completed before the build starts which means generated files could unintentionally be deleted by the clean task. There is a recipe on gulpjs.org that shows how to address this issue.

Reference: https://gulpjs.org/recipes/running-tasks-in-series

Running tasks in a series can be done 1 of 2 ways:

  1) via a callback
  2) via a stream

```javascript
gulp.task('clean', function () {
  return del(['./release/js/*.*'])
});

gulp.task('build', ['clean'], function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('release/js'))
});
```

### Running tasks in a series via Callback

```javascript
var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function (cb) { // <--- callback passed here
  del(['./release/js/*.*']);
  return cb(); // <-- return here is important
});

gulp.task('build', ['clean'], function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('release/js'));
});
```

Note that if you forget to return after invoking the callback, you will get a strange error as shown below:

```
λ ~/dev/github/seed/server/seed_server.beta/ beta* gulp clean
error TS5023: Unknown compiler option 'error'.
error TS5023: Unknown compiler option 'finish'.
[19:10:57] Using gulpfile ~/dev/github/seed/server/seed_server.beta/gulpfile.js
[19:10:57] Starting 'clean'...
[19:10:57] Finished 'clean' after 2.52 ms
λ ~/dev/github/seed/server/seed_server.beta/ beta* 

```

```javascript
var gulp = require('gulp');
var del = require('del');

var reporter = ts.reporter.longReporter();
var tsProject = ts.createProject('tsconfig.json', reporter);

gulp.task('clean', function (cb) {
  return del(['./release/js/*.*']);
});

gulp.task('build', ['clean'], function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('release/js'));
});
```

### Running tasks in a series via Stream

```javascript
var gulp = require('gulp');
var del = require('del');

var reporter = ts.reporter.longReporter();
var tsProject = ts.createProject('tsconfig.json', reporter);

gulp.task('clean', function (cb) {
  return del(['./release/js/*.*']);
});

gulp.task('build', ['clean'], function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('release/js'));
});
```

Having re-read the tutoral about streams in *https://gulpjs.org/recipes/running-tasks-in-series* it looks like our original implementation was already using a stream, but with different variable names.

Consider this:

```javascript
gulp.task('templates', ['clean'], function() {
    var stream = gulp.src(['src/templates/*.hbs'])
        // do some concatenation, minification, etc.
        .pipe(gulp.dest('output/templates/'));
    return stream; // return the stream as the completion hint
});
```

The result of *.pipe(...)* call is stored as a stream and returned. And in our code, the result of *.pipe(...)* call is stored as *tsResult* which also looks like a stream, so no further action required. Let's move on.



