
# Introduction

This (alpha) is the first attempt at creating a server node based seed project. The aim of the seed
project is to create a project that establishes a baseline of a developer workflow and uses the following frameworks/tools:

  :large_blue_circle: typescript
  :large_blue_circle: gulp
  :large_blue_circle: mocha

There are currently preciously few resources online that document this to a level that is production
ready . These seed projects aims to fill that gap and you can't reley on any books because more often than not, there are out of date and simply don't work or have deprecated dependencies :thumbsdown:.

It is assumed the reader is familiar with node basics such as how to use npm, so those wont't be documented here as there are enough adequate resources that fulfill this requirement.

:exclamation: It's important to state that these seed projects are for Server or CLI applications only, so if the reader is looking for anything regarding the browser, they should look elsewhere.

There are many good IDEs out there, but as I use Visual Studio Code (VSC), documentation will be for this IDE only.

The steps shown describe what commands were used in creating the seed project, so the reader can either replicate the steps for his/her own project or simply clone the project as their own starting point.

Also of note, the z-shell (configured with the lambda theme) on macos is being used, which is why you'll see the λ symbol as a prompt.

# Global node installations

## Install Glup-Cli globally

Install the Gulp Cli with npm globally.

  λ npm install -g gulp-cli

```
λ ~/dev/prototypes/proto-mocha-ts-gulp/ npm install -g gulp-cli
/Users/<USER>/.nvm/versions/node/v8.4.0/bin/gulp -> /Users/<USER>/.nvm/versions/node/v8.4.0/lib/node_modules/gulp-cli/bin/gulp.js
+ gulp-cli@1.4.0
updated 5 packages in 8.308s
λ ~/dev/prototypes/proto-mocha-ts-gulp/ 
λ ~/dev/prototypes/proto-mocha-ts-gulp/ 
λ ~/dev/prototypes/proto-mocha-ts-gulp/
```

## Creating the project skeleton

Create a workspace and a sub project directory. In this case, the workspace root is /server and the project folder is seed_server.alpha. (Since this will be an ongoing process until we have got to the point where the seed project adequately serves our purpose, the project directory will have a greek alphabetical suffix, denoting the attempts made. I am actually anticipating making mistakes and taking some wrong blind alleys, but it is deemed there is value in documenting the whole process for the sake of increased understanding.)

Directory structure now looks like this:

```
λ ~/dev/github/seed/ tree -d
.
└── server
    └── seed_server.alpha

```

### Include the .gitignore for typescript projects

Under the *server* directory, the .gitignore file for typescript projects should be created from this link: :link: https://github.com/Microsoft/TypeScript/blob/master/.gitignore

### Hide .js and js.map files from VSC

For typescript projects, .js files are now the derived files and not the source, so hiding them from
the VSC tree view may be of use. The same also applies to generated .map files. (This is a personal preference; sometimes, it is useful to see what has been generated so having easy access to them via the IDE may be of benefit, so use this setting if you wish.)

On macos, hit <cmd><,> this will show the settings page. In the top right corner, make sure that the dropdown indicates workspace settings. This is probably empty (for a new workspace) so insert the following code save and close.

```javascript
    "files.exclude": {
        "**/*.js": {
            "when": "$(basename).ts"
        },
        "**/*.map": true
    }
```

This will create a *.vscode/settings.json* under the workspace :open_file_folder: directory *server*.

### Initialise the project

From the seed_server.alpha :open_file_folder: directory, initialise the project.

  λ npm init -y

```
λ ~/dev/github/seed/server/seed_server.alpha/ npm init -y
Wrote to /Users/zephilim/dev/github/seed/server/seed_server.alpha/package.json:

{
  "name": "seed_server.alpha",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

# Getting started with Gulp

The next section calls upon the Gulp tutorial from typescriptlang.org at :link: https://www.typescriptlang.org/docs/handbook/gulp.html

## Install dev dependencies

  λ npm install typescript gulp gulp-typescript --save-dev

```
λ ~/dev/github/seed/server/seed_server.alpha/ npm install typescript gulp gulp-typescript --save-dev
npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN deprecated minimatch@0.2.14: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN deprecated graceful-fs@1.2.3: graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN seed_server.alpha@1.0.0 No repository field.

+ gulp@3.9.1
+ typescript@2.6.1
+ gulp-typescript@3.2.3
added 241 packages in 14.554s
λ ~/dev/github/seed/server/seed_server.alpha/ 

```

## Create basic configuration files and source typescript code

Perform the following steps as indicated ...

  :o: Create the :open_file_folder: *./src* and :open_file_folder: *./dist*: directories under the project root :open_file_folder: */seed_server.alpha* directory

  :o: Create the *main.ts* file in :open_file_folder: *./src* directory:

  :o: Create the basic tsconfig.json file in project root :open_file_folder: */seed_server.alpha* directory

  :o: Create the gulpfile.js in project root :open_file_folder: */seed_server.alpha* containing a simple (and the default) gulp task which invokes the typescript compiler to compile main.ts into the distribution :open_file_folder: *./dist* directory.

## Test the first gulp task invocation of the code

  :o: Run the default gulp task:

  λ gulp

```
λ ~/dev/github/seed/server/seed_server.alpha/ gulp
[15:49:50] Using gulpfile ~/dev/github/seed/server/seed_server.alpha/gulpfile.js
[15:49:50] Starting 'default'...
[15:49:51] Finished 'default' after 1.03 s
λ ~/dev/github/seed/server/seed_server.alpha/ 
```

  :o: Invoke the application via node:

  λ node dist/main.js

λ ~/dev/github/seed/server/seed_server.alpha/ node dist/main.js
Hello from TypeScript

  This works :thumbsup:

## Add modules to the code

  :o: Create the *greet.ts* file under the :open_file_folder: *./src* directory

  :o: Modify *./src/main.ts*

  :o: Modify *./tsconfig.json* to include greet.ts

  :o: Recompile

  λ gulp
λ ~/dev/github/seed/server/seed_server.alpha/ gulp
[16:03:13] Using gulpfile ~/dev/github/seed/server/seed_server.alpha/gulpfile.js
[16:03:13] Starting 'default'...
[16:03:14] Finished 'default' after 1.06 s
λ ~/dev/github/seed/server/seed_server.alpha/ 

  :o: Re-invoke the application via node:

λ ~/dev/github/seed/server/seed_server.alpha/ node dist/main.js   
Hello from TypeScript

The rest of this tutorial talks about taking this code to the browser using Browserify, which of course for this project we're not interested in, so we'll skip this.

I think by this point, you can see the frustration :unamused: with most tutorials on the web (especially for server based projects) in that we get so far and then stop, when in actual fact, we've not achieved much; but on we go.

