module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: '**',
                dest: 'www',
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
        watch: {
            files: ['src/**/*.*'],
            tasks: ['clean', 'copy'],
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['clean', 'copy', 'connect', 'watch']);
};