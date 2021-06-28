module.exports = {
    init: {
        // proxy: 'localhost',
        server: {
            baseDir: './sample/',
        }
    },
    reload: [
        './sample/*.html',
        './sample/dest/*.js',
    ],
    stream: [
        './sample/dest/*.css',
    ],
};
