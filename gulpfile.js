var gulp = require('gulp')
  , less = require('gulp-less')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , cleanCSS = require('gulp-clean-css')
  ;

//paths
gulp.paths = {
    scripts: {
        src: 'app/scripts',
        dst: 'dist/scripts'
    },

    styles: {
        src: 'app/styles',
        dst: 'dist/styles'
    }
};
//Styles build
gulp.task('styles', function () {
    gulp.src([
        // vendor
        gulp.paths.styles.src + '/vendor/**/*.css',

        // our styles
        gulp.paths.styles.src + '/*.less!(reset.less|__paths.less|variables.less|mixins.less)',
        gulp.paths.styles.src + '/blocks/**/main.less',
        gulp.paths.styles.src + '/blocks/**/**/main.less'
    ])
    .pipe(concat('__main.less'))
    .pipe(less())
    .on('error', console.log)
    .pipe(gulp.dest(gulp.paths.styles.dst))
    .pipe(cleanCSS())
    .pipe(rename('_main.css'))
    .pipe(gulp.dest(gulp.paths.styles.dst));
});

gulp.task('build', ['styles']);