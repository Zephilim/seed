
# Introduction

This project starts with the tutorial at https://weblogs.asp.net/dwahlin/creating-a-typescript-workflow-with-gulp.

(Changes being performed on *gamma* branch).

## Prerequisites

The folloing are assumed to have been completed as performed in seed_server.alpha:

  :o: Gulp cli already installed gloablly

  :o: Workspace directory :open_file_folder: *./seed_server* already created

  :o: .js and .map files hidden from VSC

  :o: .gitignore file already added

In order to create a seed project for a server application, we only need a couple of the files in repository at :link: *https://github.com/DanWahlin/AngularIn20TypeScript*, which are (plus the license file, but we'll deal with that later):

  :o: gulpfile.config.js
  :o: gulpfile.js

## Creating the project skeleton

Create the project :open_file_folder: *seed_server.gamma* directory

Directory structure now looks like this:

```
λ ~/dev/github/seed/ tree -d
.
└── server
    └── seed_server.gamma
```

## Initialise project

Same as in *seed_server.alpha*.

## Install dev dependencies

  λ npm install typescript gulp gulp-debug gulp-inject gulp-sourcemaps gulp-typescript gulp-tslint merge2 --save-dev

λ ~/dev/github/seed/server/seed_server.gamma/ gamma* npm install typescript gulp gulp-debug gulp-inject gulp-sourcemaps gulp-typescript gulp-tslint merge2 --save-dev
npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN gulp-tslint@8.1.2 requires a peer of tslint@>=5.0.0-dev but none is installed. You must install peer dependencies yourself.
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ gulp@3.9.1
+ gulp-debug@3.1.0
+ gulp-inject@4.3.0
+ gulp-typescript@3.2.3
+ gulp-sourcemaps@2.6.1
+ gulp-tslint@8.1.2
+ typescript@2.6.1
+ merge2@1.2.0
added 301 packages in 17.031s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 

(oops forgot tslint; peer dependency)
  λ npm install tslint --save-dev

λ ~/dev/github/seed/server/seed_server.gamma/ gamma* npm install tslint --save-dev
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ tslint@5.8.0
added 17 packages in 3.87s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 

## Install application dependencies

  λ npm install gulp-clean --save

Not really sure why *gulp-clean*, is not a *devDependency*; will need to check this.

## Tidy up task names

Some of the task names need to be simplified

  compile-ts => compile
  gen-ts-refs => refs
  ts-lint => lint
  clean-ts => clean

## Generate a default tsconfig file

  λ tslint --init

This generates a defaults a tslint.json. For now, we'll just disale the noconsole rule, by inserting:

```javascript
    "rules": {
        "no-console": false
    },
```

## gulpfile config

The structure of the application is defined within a config file *gulpfile.config.js*.

## Default code

We need to add some fodder code, that will eventually be removed, but provided here to perform a quick test of our gulp setup. So under :open_file_folder: *.src/app/* directory, create *greet.ts* and *main.ts*

*greet.ts*:
```javascript
export function sayHello(name: string) {
  return `Hello from ${name}`;
}
```

*main.ts*:
```javascript
import { sayHello } from "./greet";

console.log(sayHello("TypeScript"));
```

## Gulp tasks running individually

### "lint" Task

Now, the first thing to realise about the source project (AngularIn20TypeScript) is that it's a few years old and as such a lot of what's in it is obselete and may not work. A case in point is the tslint code (gulp-tslint). The project uses version "^1.4.3" of gulp-tslint, where as today, gulp-tslintis up to version "^8.1.2", so the way you interact with it is different.

The following is the original implementation of the lint task (for gulp-tslint 1.4.3):

```javascript
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScript)
      .pipe(tslint())
      .pipe(tslint.report('prose'));
});
```

...but this no longer works on gulp-tslint version "8.1.2":

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* gulp lint
[20:24:56] Using gulpfile ~/dev/github/seed/server/seed_server.gamma/gulpfile.js
[20:24:56] Starting 'lint'...
DEBUG- lint task; allTypeScript:  ./src/app/**/*.ts
[20:24:56] 'lint' errored after 6.32 ms
[20:24:56] TypeError: Cannot create property 'emitError' on string 'prose'
    at Function.tslintPlugin.report (/Users/zephilim/dev/github/seed/server/seed_server.gamma/node_modules/gulp-tslint/index.js:117:27)
    at Gulp.<anonymous> (/Users/zephilim/dev/github/seed/server/seed_server.gamma/gulpfile.js:37:22)
    at module.exports (/Users/zephilim/dev/github/seed/server/seed_server.gamma/node_modules/orchestrator/lib/runTask.js:34:7)
    at Gulp.Orchestrator._runTask (/Users/zephilim/dev/github/seed/server/seed_server.gamma/node_modules/orchestrator/index.js:273:3)
    at Gulp.Orchestrator._runStep (/Users/zephilim/dev/github/seed/server/seed_server.gamma/node_modules/orchestrator/index.js:214:10)
    at Gulp.Orchestrator.start (/Users/zephilim/dev/github/seed/server/seed_server.gamma/node_modules/orchestrator/index.js:134:8)
    at /Users/zephilim/.nvm/versions/node/v8.4.0/lib/node_modules/gulp-cli/lib/versioned/^3.7.0/index.js:54:20
    at _combinedTickCallback (internal/process/next_tick.js:131:7)
    at process._tickCallback (internal/process/next_tick.js:180:9)
    at Function.Module.runMain (module.js:611:11)

```

Referring to :link: https://www.npmjs.com/package/gulp-tslint, we have to use the *formatter* property on an object passed to tslint, eg:

```javascript
gulp.task("tslint", () =>
    gulp.src("source.ts")
        .pipe(tslint({
            formatter: "prose"  // <-- new way to use tslint
        }))
        .pipe(tslint.report())
);
```

so our lint task now becomes smething like:

```javascript
gulp.task('lint', function () {
  return gulp.src("./src/app/**/*.ts")
    .pipe(tslint({
      formatter: "prose"
    }))
    .pipe(tslint.report());
});
```
which results in output like the following:

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* gulp lint
[13:53:59] Using gulpfile ~/dev/github/seed/server/seed_server.gamma/gulpfile.js
[13:53:59] Starting 'lint'...
[13:53:59] Finished 'lint' after 8.14 ms
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 
```

### "compile" task

Here is the original compile task:

```javascript
gulp.task('compile', function () {
    var sourceTsFiles = [config.allTypeScript,                // path to typescript files
                         config.libraryTypeScriptDefinitions, // reference to library .d.ts files
                         config.appTypeScriptReferences];     // reference to app.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});
```

Running the original task without modification results in the following:

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* gulp compile
[13:58:51] Using gulpfile ~/dev/github/seed/server/seed_server.gamma/gulpfile.js
[13:58:51] Starting 'compile'...
gulp-typescript: noExternalResolve is deprecated - use noResolve instead
  The non-standard option noExternalResolve has been removed as of gulp-typescript 3.0.
  Use noResolve instead.
  More information: http://dev.ivogabe.com/gulp-typescript-3/
[13:58:53] Finished 'compile' after 1.13 s
```

... and making the change by using "noResolve" appears to work ok:

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* gulp compile
[14:09:25] Using gulpfile ~/dev/github/seed/server/seed_server.gamma/gulpfile.js
[14:09:25] Starting 'compile'...
[14:09:26] Finished 'compile' after 1.06 s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 

```

### "clean" task

The following is the original clean task:

```javascript
gulp.task('clean', function () {
  var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                            config.sourceApp +'**/*.js',    // path to all JS files auto gen'd editor
                            config.sourceApp +'**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  return gulp.src(typeScriptGenFiles, {read: false})
      .pipe(clean());
});
```

This works out of the box, so nothing to do here :thumbsup:

### "watch" task

The following is the original watch task:

```javascript
gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['lint', 'compile', 'refs']);
});
```

This works out of the box, so nothing to do here :thumbsup:

### "default" task

The following is the original default task:

```javascript
gulp.task('default', ['lint', 'compile', 'refs', 'watch']);
```

This works out of the box, so nothing to do here :thumbsup:

## Reorganise project structure

I don't like the current project structure because the output files are generated under the source (src) directory which seems counter intuitive:

```
└── src
    ├── app
    └── js    // <-- This is an output directory, under the source
```

*tsOutputPath* in the *gulpfile.onfig.js* has been redirected to *./release* so now we have a hierachy that looks like this:

```
├── release
│   └── js
└── src
    └── app
```

## Run Mocha tests with gulp-mocha

### Install dependencies

  λ npm install --save-dev gulp-mocha

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma npm install --save-dev gulp-mocha
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ gulp-mocha@4.3.1
added 30 packages in 4.341s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 
```

  λ npm install --save-dev mocha-typescript

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* npm install --save-dev mocha-typescript
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ mocha-typescript@1.1.12
added 19 packages in 3.774s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 
```

  λ npm install chai --save-dev

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* npm install chai --save-dev 
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ chai@4.1.2
added 7 packages in 3.056s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 
```

### Add "test" task

The following example was found at :link: https://www.npmjs.com/package/gulp-mocha

```javascript
gulp.task('default', () =>
    gulp.src('test.js', {read: false})
        // `gulp-mocha` needs filepaths so you can't have any plugins before it 
        .pipe(mocha({reporter: 'nyan'}))
);
```

npm install mocha --save-dev
```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* npm install mocha --save-dev
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ mocha@4.0.1
added 6 packages, updated 5 packages and moved 3 packages in 4.896s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 
```

npm install @types/chai @types/mocha --save-dev
```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* npm install @types/chai @types/mocha --save-dev
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ @types/chai@4.0.5
+ @types/mocha@2.2.44
added 2 packages in 3.983s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 

```

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* npm install ts-node --save-dev
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ ts-node@3.3.0
added 12 packages in 5.86s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 
```

```
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* npm install --save-dev tslint-eslint-rules
npm WARN seed_server.gamma@1.0.0 No description
npm WARN seed_server.gamma@1.0.0 No repository field.

+ tslint-eslint-rules@4.1.1
added 4 packages in 3.377s
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 
```


npm install chai mocha ts-node @types/chai @types/mocha --save-dev



  Failed to lint: /Users/zephilim/dev/github/seed/server/seed_server.gamma/src/app/dummy.spec.ts [13, 1]: trailing whitespace, /Users/zephilim/dev/github/seed/server/seed_server.gamma/src/app/dummy.spec.ts [3, 1]: Import sources within a group must be alphabetized.,
  
  /Users/zephilim/dev/github/seed/server/seed_server.gamma/src/app/dummy.spec.ts [2, 26]: ' should be ", /Users/zephilim/dev/github/seed/server/seed_server.gamma/src/app/dummy.spec.ts [3, 24]: ' should be ", /Users/zephilim/dev/github/seed/server/seed_server.gamma/src/app/dummy.spec.ts [11, 10]: ' should be ", /Users/zephilim/dev/github/seed/server/seed_server.gamma/src/app/dummy.spec.ts [12, 6]: ' should be ", /Users/zephilim/dev/github/seed/server/seed_server.gamma/src/app/dummy.spec.ts [15, 29]: ' should be ".
λ ~/dev/github/seed/server/seed_server.gamma/ gamma* 


