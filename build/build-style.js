var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

// 编译less
function css() {
    return gulp.src('../src/styles/editor.less')
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('minder.css'))
        .pipe(gulp.dest('../dist/styles'));
}

// 拷贝图片
function images() {
    return gulp.src('../src/styles/images/*.*')
        .pipe(gulp.dest('../dist/styles/images'));
}

exports.default = gulp.parallel(css, images);
