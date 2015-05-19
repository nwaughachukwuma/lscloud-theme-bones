var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require("gulp-notify");


// Lint
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify(
            function (file) {
              if (file.jshint.success) {
                return false;
              }

              var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                  return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
              }).join("\n");
              return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
            }
        ));
});

// Compile sass
gulp.task('sass', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('resources/stylesheets'));
});

// Concat & minify JS
gulp.task('scripts', function() {
    return gulp.src('resources/js/*.js')
        .pipe(concat('_all.js'))
        .pipe(gulp.dest('resources/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('resources/js'));
});

// Watch for changes
gulp.task('watch', function() {
    gulp.watch('resources/js/*.js', ['lint', 'scripts']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);