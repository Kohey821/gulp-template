const { src, watch, dest, series, parallel } = require('gulp');

const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');

const sass = require('gulp-sass');
sass.compiler = require('sass');
const Fiber = require('fibers');;
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pipline = require('readable-stream').pipeline;

const { config } = require('./gulpfile-config');

const checkNested = (obj, level, ...rest) => {
    if (typeof obj === 'undefined') return false;
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
    return checkNested(obj[level], ...rest);
};

const useBrowserSync = () => {
    return checkNested(config, 'browserSync');
};

const sassFileExists = () => {
    return checkNested(config.watch, 'compile', 'sass', 'src');
};

const jsFileExists = () => {
    return checkNested(config.watch, 'compile', 'js', 'src');
};

const streamCss = (stream) => {
    return stream
        .pipe(browserSync.stream());
};

const compileJs = () => {
    return jsFileExists() && pipline(
        src(config.watch.compile.js.src),
        sourcemaps.init(),
        concat(config.watch.compile.js.name, { newLine: ';' }),
        babel({
            presets: ['@babel/env']
        }),
        uglify({
            keep_fnames: true,
            mangle: false,
        }),
        sourcemaps.write('.'),
        dest(config.watch.compile.js.dest)
    );
};

const compileSass = () => {
    return sassFileExists() && src(config.watch.compile.sass.src)
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "compressed",
                fiber: Fiber,
            })
                .on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(config.watch.compile.sass.dest));
};

const setBrowserSyncEvents = (cb) => {
    if (useBrowserSync()) {
        browserSync.init(config.browserSync);

        watch(config.watch.stream.src, () => {
            return streamCss(src(config.watch.stream.src));
        });

        watch(config.watch.reload.src, (cb) => {
            browserSync.reload();

            cb();
        });
    }

    cb();
};

const dev = (cb) => {
    sassFileExists()
        && watch(config.watch.compile.sass.src, compileSass);
    jsFileExists()
        && watch(config.watch.compile.js.src, compileJs);

    cb();
};

exports.default = series(
    parallel(
        compileJs,
        compileSass
    ),
    setBrowserSyncEvents,
    dev
);