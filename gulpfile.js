var gulp = require('gulp'),
    concatCSS = require('gulp-concat-css'),
    rename = rename('gulp-rename'),
    notify = notify('gulp-notify'),
    minifyCSS = require('gulp-minify-css');

gulp.task('default', function() {
    gulp.src('css/*.css')
        .pipe(concatCSS('bundle.css'))
        .pipe(minifyCSS())
        .pipe(rename('bundle.min.css'))
        .pipe(notify('Done!'))
        .pipe(gulp.dest('app/'))
});

gulp.task('watch',function(){
    gulp.watch('css/*.css',['default'])
})