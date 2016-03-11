var paths = require('../paths');
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.output + 'css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.styles, ['sass']);
});
