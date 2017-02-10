var gulp = require('gulp')
  , less = require('gulp-less')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , cleanCSS = require('gulp-clean-css')
  , uglify = require('gulp-uglify')
  , imagemin = require('gulp-imagemin')
  , pngquant = require('imagemin-pngquant')
  , eslint = require('gulp-eslint')
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
    },

    images: {
        src: 'app/images',
        dst: 'dist/images'
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

gulp.task('scripts', function () {
    gulp.src([
        gulp.paths.scripts.src + '/repo/**/*.js',
        gulp.paths.scripts.src + '/*.js'

    ])
    .pipe(uglify().on('error', function(e){
        console.log(e);
    }))
    .pipe(gulp.dest(gulp.paths.scripts.dst))
});

gulp.task('images', function () {
    gulp.src(gulp.paths.images.src)
    .pipe(imagemin({ //Сожмем их
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    }))
    .pipe(gulp.dest(gulp.paths.images.dst));
});

gulp.task('lint', function() {
    return gulp.src([
        gulp.paths.scripts.src + '/repo/**/*.js',
        gulp.paths.scripts.src + '/*.js'
    ])
    .pipe(eslint({
        'rules': {
            'camelcase': 'error',
            'no-console': 1
        }
    }))
    .pipe(eslint.format())
    // Brick on failure to be super strict
    .pipe(eslint.failOnError());
});

gulp.task('build', ['styles', 'scripts', 'lint']);