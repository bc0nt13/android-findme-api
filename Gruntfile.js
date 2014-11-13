module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            src: [
                'index.js',
                'src/**/*.js',
                'spec/**/*.js'
            ]
        },

        cucumberjs: {
            test: {
                src: 'features',
                options: {
                    steps: 'features'
                }
            }
        },

        jasmine: {
            test: {
                options: {
                    specs: 'spec/**/*.spec.js',
                    version: "2.0.0",
                    summary: "full",
                    keepRunner: false,
                    junit: {
                        path: 'build/logs/jasmine'
                    }
                }
            }
        },

        jscs: {
            options: {
                config: ".jscsrc"
            },
            test: {
                files: {
                    src: '<%= meta.src %>'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            test: {
                files: {
                    src: '<%= meta.src %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-cucumber');


    grunt.registerTask('test', ['jscs', 'jshint', 'jasmine', 'cucumberjs']);
};
