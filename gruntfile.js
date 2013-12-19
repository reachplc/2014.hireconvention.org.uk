module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    settings: grunt.file.readJSON('config.json'),

    //  Setup config depending on environment

    config: {
      dev: {
        options: {
          variables: {
            'dest': 'html/',
            'url': 'http://localhost:3000',
            'api': 'http://localhost/2014.hireconvention.org.uk',
            'paypal': 'https://www.sandbox.paypal.com/cgi-bin/webscr'
          }
        }
      },
      build: {
        options: {
          variables: {
            'dest': '2014/',
            'url': 'http://www.hireconvention.org.uk/2014',
            'api': 'http://www.hireconvention.org.uk/2014/api',
            'paypal': 'https://www.paypal.com/cgi-bin/webscr'
          }
        }
      }
    },

    assemble: {
      // Task-level options.
      options: {
        prettify: {indent: 2},
        flatten: true,
        //  Sites URL
        url: '<%= grunt.config.get("url") %>',
        //  URL for API location
        api: '<%= grunt.config.get("api") %>',
        //  PayPal URL to submit data
        paypal: '<%= grunt.config.get("paypal") %>',
        //  PayPal account to recieve payment
        paypal_account: '<%= settings.paypal_account %>',
        static: '<%= grunt.config.get("url") %>/static',
        gui: '<%= grunt.config.get("url") %>/static/gui',
        media: '<%= grunt.config.get("url") %>/media',
        layout: 'src/templates/layouts/default.hbs',
        partials: 'src/templates/includes/*.hbs',
        data: 'src/data/*.{json,yml}'
      },
      // Templates to build into pages
      files: {
        files: [
          { expand: true, cwd: 'src/templates/pages/', src: ['**/*.hbs'], dest: '<%= grunt.config.get("dest") %>' }
        ]
      }
    },

    copy: {
      dev:{
        files: [
          { expand: true, cwd: 'src/static/js', src: ['**/*.js'], dest: '<%= grunt.config.get("dest") %>static/js'}
        ]
      },
      media: {
        files: [
          { expand: true, cwd: 'src/media', src: ['**/*'], dest: '<%= grunt.config.get("dest") %>media'}
        ]
      },
      bower: {
        files: [
          { expand: true, flatten: true, cwd: 'bower_components', src: ['jquery/jquery.min.js', 'html5shiv/dist/html5shiv.js'], dest: '<%= grunt.config.get("dest") %>static/js/lib'}
        ]
      }
    },

    less: {
      options: {
        paths: ['<%= grunt.config.get("dest") %>static/css']
      },
      dev: {
        files: {
          '<%= grunt.config.get("dest") %>static/css/global.css': ['src/less/global.less']
        }
      }
    },

    watch: {
      files: ['src/**/*'],
      tasks: ['config:dev', 'build'],
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
      files: ['<%= grunt.config.get("dest") %>']
    },

  //  Optimise

    imagemin: {
      options: {
        optimizationLevel: 3
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/static/gui',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= grunt.config.get("dest") %>static/gui'
        },
        {
          expand: true,
          cwd: 'src/static/media',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= grunt.config.get("dest") %>static/media'
        }]
      }
    },

  //  Tests

    htmlhint: {
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
      src: ['<%= grunt.config.get("dest") %>**/*.html']

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
      src: ['<%= grunt.config.get("dest") %>static/css/*.css']
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
      src: ['gruntfile.js', '<%= grunt.config.get("dest") %>static/js/*.js']
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-config');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', 'serve');
  grunt.registerTask('ci-test', ['htmlhint','csslint', 'jshint']);
  grunt.registerTask('build', ['clean', 'assemble', 'copy', 'imagemin', 'less', 'ci-test']);
  grunt.registerTask('serve', ['config:dev', 'build', 'express', 'watch']);
  grunt.registerTask('deploy', ['config:build', 'build']);

};