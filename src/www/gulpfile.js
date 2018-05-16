/**
 * Created by Administrator on 2017/12/6.
 */



const gulp = require('gulp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const babelify = require('babelify');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const fs = require('fs');
const path = require('path');
const spriter = require('gulp-css-spriter');


const paths = require('./config/paths');

    /**
 * 生成浏览器util
 */
let {enter,dest,fileName,compress} = paths;
gulp.task('util',['babelJs'],() => {
    let srcPath = path.resolve(__dirname,'temp',enter);
    let promise = gulp.src(srcPath);
    promise = promise.pipe(plumber()).pipe(browserify());
    promise = promise.pipe(concat(fileName || 'util.js'));
    if(compress){
        promise = promise.pipe(uglify({
            ie8:true
        }));
    }
    return promise.pipe(gulp.dest(dest));
});

let babelDirs = ['browse','lib'];
gulp.task('babelJs',() => {
    let srcPaths = fs.readdirSync(__dirname).map(item => {
        let srcPath = '!./' + item;
        if(babelDirs.indexOf(item) === -1){
            let stat = fs.statSync(path.resolve(__dirname,item));
            srcPath += stat.isDirectory() ? '/**' : '';
        }else{
            srcPath = '';
        }
        return srcPath;
    }).filter(item => !!item);
    srcPaths.push('./**');
    return gulp.src(srcPaths)
        .pipe(plumber())
        .pipe(babel({
            presets:[
                [
                    'es2015',
                    {
                        loose:true
                    }
                ]
            ]
        }))
        .pipe(gulp.dest('temp'))
});
gulp.task('default',['util']);