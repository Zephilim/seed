
* outfile

* a proposed delete task:

```javascript
del = require('del'),

gulp.task('clean', function(cb) {
    del(['./resources/css_gulp/*.*'], cb)
});
```

* production test use gulp-util / gulp-if
var _if = require('gulp-if'),
    gutil = require('gulp-util');

var production = gutil.env.production;

//...

     // use like so in your pipe:
    .pipe(_if(!production, notify('...')))


* what is gulp-notify?
