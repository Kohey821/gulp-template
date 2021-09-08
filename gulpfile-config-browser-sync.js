module.exports = {
  init: {
    // proxy: 'localhost',
    server: {
      baseDir: './sample/',
    },
    open: false,
  },
  reload: [
    './sample/*.html',
    './sample/dest/*.js',
  ],
  stream: [
    './sample/dest/*.css',
  ],
};

