module.exports = {
    sass: [
        {
            src: [
                './sample/src/sass/*.scss',
                './sample/src/sass/*.sass',
            ],
            dest: [
                './sample/dest',
            ]
        },
    ],
    js: [
        {
            src: [
                './sample/src/js/*.js',
            ],
            dest: [
                './sample/dest',
            ],
            name: 'main.js',
        },
    ],
};
