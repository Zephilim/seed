
* outfile


* gulp-tslint

The first thing you do is init, this generates a tslint.json

-> https://travismaynard.com/writing/getting-started-with-gulp

  @ This contains a good default task, which does lint, compilation and watch

* here are some configs:
-> https://github.com/palantir/tslint/tree/master/src/configs

* define tslin rules
-> https://palantir.github.io/tslint/usage/configuration/

* Creating a TypeScript Workflow with Gulp
-> https://weblogs.asp.net/dwahlin/creating-a-typescript-workflow-with-gulp
-> https://github.com/DanWahlin/AngularTypeScript


* coverage
-> https://www.npmjs.com/package/nyc

* gulp-watch (Rebuild only files that change)

* production test use gulp-util / gulp-if
var _if = require('gulp-if'),
    gutil = require('gulp-util');

var production = gutil.env.production;

//...

     // use like so in your pipe:
    .pipe(_if(!production, notify('...')))


* what is gulp-notify?


* apply DRY

* typesrcipt mocha
-> https://templecoding.com/blog/2016/05/05/unit-testing-with-typescript-and-mocha/
-> https://github.com/robzhu/TypeScript-Mocha
-> mochajs.org
-> http://www.hossambarakat.net/2017/06/01/running-mocha-with-typescript/
-> https://www.npmjs.com/package/mocha-typescript


* To search for typescript libraries
-> https://microsoft.github.io/TypeSearch/

* Integrate TSC with VSC
-> https://code.visualstudio.com/docs/languages/typescript
