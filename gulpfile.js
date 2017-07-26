var gulp        = require('gulp'),
    wiredep     = require('wiredep').stream,
    browserSync = require('browser-sync').create(),
    sass        = require('gulp-sass'),
    postcss     = require('gulp-postcss'),
    autoprefixer= require('autoprefixer'),
    cssnano     = require('cssnano');


gulp.task('css', function(){
  var processors = [
    autoprefixer({browsers: ['last 2 version']}),
    cssnano(),
  ];
  return gulp.src('./html/css/main.css')
    .pipe(postcss(processors))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: "./html",
        notify: false,
        port: 8080,
        ui: {
            port: 8081
        }
    });
});

gulp.task('sass', function() {
    return gulp.src("./html/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./html/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['browser-sync'], function(){
    gulp.watch("html/scss/*.scss", ['sass']);
    gulp.watch("html/js/*.js").on('change', browserSync.reload);
    gulp.watch("html/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
