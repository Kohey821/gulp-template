const { src, watch, dest, series, parallel } = require('gulp');

const browserSync = require('browser-sync').create();

const sourcemaps = require('gulp-sourcemaps');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pipline = require('readable-stream').pipeline;

const sass = require('gulp-sass')(require('sass'));
const Fiber = require('fibers');;
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

const svgmin = require('gulp-svgmin');

const compileConfig = require('./gulpfile-config-compile');

let browserSyncConfig = null;
try {
    browserSyncConfig = require('./gulpfile-config-browser-sync');
} catch {
    console.log(`
        --------------------------------------
        gulpfile-config-browser-sync.js
        を作成すると幸せになれます。
        --------------------------------------
    `);
}

const checkNested = (obj, level, ...rest) => {
    if (typeof obj === 'undefined') return false;
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
    return checkNested(obj[level], ...rest);
};

const configExist = (...prop) => {
    return checkNested(...prop);
};

const streamCss = (stream) => {
    return stream
        .pipe(browserSync.stream());
};

const compileJs = (cb) => {
    if (configExist(compileConfig, 'js')) {
        for (let i of compileConfig.js) {
            pipline(
                src(i.src),
                sourcemaps.init(),
                concat(i.name),
                babel({
                    presets: ['@babel/env']
                }),
                uglify({
                    keep_fnames: true,
                    mangle: false,
                }),
                sourcemaps.write('.'),
                dest(i.dest),
                dest(i.dest)
            );
        }
    }

    cb();
};

const compileSass = (cb) => {
    if (configExist(compileConfig, 'sass')) {
        for (let i of compileConfig.sass) {
            src(i.src)
                .pipe(sourcemaps.init())
                .pipe(
                    sass({
                        outputStyle: "compressed",
                        fiber: Fiber,
                    })
                        .on('error', sass.logError))
                .pipe(postcss([ autoprefixer() ]))
                .pipe(sourcemaps.write('.'))
                .pipe(dest(i.dest))
                .pipe(dest(i.dest));
        }
    }

    cb();
};

const compileSvg = (cb) => {
    if (configExist(compileConfig, 'svg')) {
        for (let i of compileConfig.svg) {
            src(i.src)
                .pipe(svgmin({
                    plugins: [
                        {cleanupIDs: false},
                    ],
                }))
                .pipe(dest(i.dest))
                .pipe(dest(i.dest));
        }
    }

    cb();
};

const setBrowserSyncEvents = (cb) => {
    if (browserSyncConfig) {
        browserSync.init(browserSyncConfig.init);

        watch(browserSyncConfig.stream, () => {
            return streamCss(src(browserSyncConfig.stream));
        });

        watch(browserSyncConfig.reload, (cb) => {
            browserSync.reload();

            cb();
        });
    }

    cb();
};

const dev = (cb) => {
    if (configExist(compileConfig, 'js')) {
        for (let i of compileConfig.js) {
            watch(i.src, compileJs);
        }
    }

    if (configExist(compileConfig, 'sass')) {
        for (let i of compileConfig.sass) {
            watch(i.src, compileSass);
        }
    }

    if (configExist(compileConfig, 'svg')) {
        for (let i of compileConfig.svg) {
            watch(i.src, compileSvg);
        }
    }

    cb();
};

exports.default = series(
    parallel(
        compileJs,
        compileSass,
        compileSvg
    ),
    setBrowserSyncEvents,
    dev
);
