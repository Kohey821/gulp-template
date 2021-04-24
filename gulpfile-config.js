exports.config = {
  browserSync: {
    proxy: 'localhost'
  }
  , watch: {
    reload: {
      src: [
        './app/**/*.html'
      ]
    }
    , stream: {
      src: [
        './app/css/**/*.css'
      ]
    }
    , compile: {
      sass: {
        src: [
          './app/sass/**/*.sass'
          , './app/sass/**/*.scss'
        ]
        , dest: './app/css'
      }
    }
  }
};