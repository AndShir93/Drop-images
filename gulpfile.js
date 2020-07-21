var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass',function(){
    return gulp.src('app/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error',sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('script',function(){
    return gulp.src('dist/script/*.js')
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html',function(){
    return gulp.src('dist/*.html')
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', function(){
  browserSync.init({
      server: {
            baseDir: 'dist'
        }, notify: false
});
    gulp.watch("dist/*.html", gulp.series('html'));  // <--- В кавычках название таска
    gulp.watch('app/sass/*.scss',gulp.series('sass'));
    gulp.watch('dist/script/*.js',gulp.series('script'));
})