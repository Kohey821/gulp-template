exports.config = {
    browserSync: {
        server: './sample',
    },
    watch: {
        reload: {
            src: [
                './sample/**/*.html',
            ]
        },
        stream: {
            src: [
                './sample/css/dest/**/*.css',
            ]
        },
        compile: {
            sass: {
                src: [
                    './sample/css/src/**/*.sass',
                    './sample/css/src/**/*.scss',
                ],
                dest: [
                    './sample/css/dest',
                ]
            },
            js: {
                src: [
                    './sample/js/src/three.js',
                    './sample/js/src/two.js',
                    './sample/js/src/one.js',
                ],
                dest: [
                    './sample/js/dest',
                ],
                name: 'bundle.js',
            },
        }
    }
};