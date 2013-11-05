module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      // Task-level options.
      options: {
        prettify: {indent: 2},
        flatten: true,
        assets: 'static',
        layout: 'src/templates/layouts/default.hbs',
        partials: 'src/templates/includes/*.hbs',
        data: 'src/data/*.{json,yml}'
      },
      // Templates to build into pages
      pages: {
        files: [
          { expand: true, cwd: 'src/templates/pages/', src: ['**/*.hbs'], dest: 'html/' }
        ]
      }
    },

    less: {
      dev: {
        options: {
          paths: ['html/static/css']
        },
        files: {
          'html/static/css/global.css': ['src/less/global.less']
        }
      }
    },

    watch: {
      files: ['src/**/*'],
      tasks: ['clean', 'assemble', 'less'],
      options: {
        livereload: true
      }
    },

    express: {
      dev: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: 'html'
        }
      }
    },

    clean: {
      dev: ['html']
    },

    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true,
          'src-not-empty': true,
          'img-alt-require': true
        },
        src: ['html/**/*.html']
      }
    },

    csslint: {
      options: {
        'adjoining-classes': false,
        'box-model': false,
        'box-sizing': false,
        'regex-selectors': false,
        'universal-selector': false,
        'font-sizes': false  //  Until CSSLint has the option to set an ammount
      },
      files: {
        src: ['html/static/css/*.css']
      }
    },

    jshint: {
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        indent: 2,
        laxbreak: true,
        laxcomma: true,
        quotmark: 'single',
        trailing: true,
        undef: true,
        globals: {
          console: true,
          module: true,
          jQuery: true
        }
      },
      files: {
        src: ['gruntfile.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');


  grunt.registerTask('default', 'serve');
  grunt.registerTask('serve', ['clean', 'assemble', 'less', 'express', 'watch']);
  grunt.registerTask('ci-test', ['htmlhint','csslint', 'jshint']);

};