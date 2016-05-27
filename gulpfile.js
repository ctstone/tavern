var gulp = require('gulp')
  , sass = require('gulp-sass')
  , zip = require('gulp-zip')
  , include = require('gulp-include');

gulp.task('res.css', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css', {cwd:'build'}));
});

gulp.task('res', ['res.css'], function() {
  return gulp.src('@(img|js)/**').pipe(gulp.dest('build'));
});

gulp.task('dep.js', function() {
  return gulp.src([
    'bootstrap/dist/js/bootstrap?(.min).js',
    'moment/min/moment.min.js',
    'jquery/dist/jquery?(.min).js'], {cwd:'bower_components'})
		.pipe(gulp.dest('lib/js', {cwd:'build'}));
});

gulp.task('dep.css', function() {
  return gulp.src([
    'bootstrap/dist/css/bootstrap?(.min).css',
    'bootstrap/dist/css/bootstrap.css.map',
    'font-awesome/css/font-awesome?(.min).css',
    'font-awesome/css/font-awesome.css.map'], {cwd:'bower_components'})
		.pipe(gulp.dest('lib/css', {cwd:'build'}));
});
gulp.task('dep.fonts', function() {
  return gulp.src([
    'bootstrap/dist/fonts/*',
    'font-awesome/fonts/*'], {cwd:'bower_components'})
		.pipe(gulp.dest('lib/fonts', {cwd:'build'}));
});
gulp.task('dep', ['dep.js', 'dep.css', 'dep.fonts']);

gulp.task('files', function() {
  return gulp.src('files/**').pipe(gulp.dest('files', {cwd:'build'}))
});

gulp.task('build', ['res', 'dep', 'files'], function() {
  return gulp.src('www/[^_]**')
    .pipe(include())
    .on('error', console.error)
    .pipe(gulp.dest('build'));
});

gulp.task('package', ['build'], function() {
  return gulp.src('**', {cwd:'build'})
    .pipe(zip('package.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('install', ['build'], function() {
  return gulp.src('build/**').pipe(gulp.dest('/http/ww8081'));
});

gulp.task('watch', ['install'], function() {
  return gulp.watch(['www/**', 'js/**', 'scss/**', 'img/**'], ['install']);
});

gulp.task('default', ['build']);