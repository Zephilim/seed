
* outfile


* gulp-tslint

* gulp-watch (Rebuild only files that change)

* production test use gulp-util / gulp-if
var _if = require('gulp-if'),
    gutil = require('gulp-util');

var production = gutil.env.production;

//...

     // use like so in your pipe:
    .pipe(_if(!production, notify('...')))


* what is gulp-notify?

* learn this: https://gulpjs.org/recipes/running-tasks-in-series

* apply DRY
