exports.config = {
  browserSync: {
    init: {
      proxy: 'localhost'
    }
  }
  , watch: {
    src: [
      './app/**/*.html'
    ]
    , sass: {
      src: [
        './app/sass/**/*.sass'
        , './app/sass/**/*.scss'
      ]
      , dest: './app/css'
    }
  }
};