const { src, watch, dest, series } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');

const { config } = require('./gulpfile-config');

const checkNested = (obj, level, ...rest) => {
  if (typeof obj === 'undefined') return false;
  if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
  return checkNested(obj[level], ...rest);
};

const streamCss = (stream) => {
  return stream
    .pipe(browserSync.stream());
};

const sassFileExists = () => {
  return checkNested(config.watch, 'compile', 'sass', 'src');
};

const compileSass = () => {
  if (sassFileExists()) {
    return src(config.watch.compile.sass.src)
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: "compressed",
      }).on('error', sass.logError))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(config.watch.compile.sass.dest));
  }

  return;
};

const dev = (cb) => {
  compileSass();

  browserSync.init(config.browserSync);

  sassFileExists()
    && watch(config.watch.compile.sass.src, compileSass);

  watch(config.watch.stream.src, () => {
    return streamCss(src(config.watch.stream.src));
  });

  watch(config.watch.reload.src, (cb) => {
    browserSync.reload();

    cb();
  });

  cb();
};

exports.default = series(dev);