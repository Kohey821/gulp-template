const { src, watch, dest, series } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');

const { config } = require('./gulp-config');

const streamCss = (stream) => {
  return stream
    .pipe(browserSync.stream());
};

const compileSass = () => {
  return src(config.watch.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "compressed",
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(config.watch.sass.dest));
};

const dev = (cb) => {
  compileSass();

  browserSync.init(config.browserSync.init);

  watch(config.watch.sass.src, compileSass);

  let cssFiles = config.watch.sass.dest + '/**/*.css';
  watch(cssFiles, () => {
    return streamCss(src(cssFiles));
  });

  watch(config.watch.src, (cb) => {
    browserSync.reload();

    cb();
  });

  cb();
};

exports.default = series(dev);