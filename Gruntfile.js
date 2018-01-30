module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**',
                    dest: 'www'
                }, {
                    expand: true,
                    cwd: 'node_modules',
                    flatten: true,
                    src: [
                        'jquery/dist/jquery.min.js',
                        'bootstrap/dist/css/bootstrap.min.css',
                        'bootstrap/dist/js/bootstrap.min.js'
                    ],
                    dest: 'www'
                }]
            }
        },
        clean: ['www'],
        connect: {
            server: {
                options: {
                    base: 'www',
                    port: 9090
                }
            }
        },
        jshint: {
            files: ['src/**/*.js'],
            options: {
                jshintrc: true
            }
        },
        watch: {
            files: ['src/**/*.*'],
            tasks: ['clean', 'jshint', 'copy'],
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['clean', 'jshint', 'copy', 'connect', 'watch']);
};