var
fs = require('fs'),
_ = require('lodash');

var
gulp  = require('gulp'),
gutil = require('gulp-util'),
jade  = require('gulp-jade');

var
jadePath = './src/index.jade',
answers = './src/answers/*.csv';

gulp.task('jade', function () {
  var
  data = {};
  data.answers = _.range(32, 46+1).map(function (i) {
    return fs.readFileSync('./src/answers/' + i + '.csv', 'utf-8').split(/\n/g).map(function (line) {
      return line.split(/\,/g);
    });
  });
  gulp.src(jadePath)
      .pipe(jade({data: data}).on('error', gutil.log))
      .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
  gulp.watch(jadePath, ['jade']);
  gulp.watch(answers, ['jade']);
});

gulp.task('default', ['jade', 'watch']);
