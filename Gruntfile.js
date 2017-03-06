module.exports = function(grunt) {
  grunt.initConfig({

    concat: {
      options: {
        separator: '\n/*next file*/\n\n'
      },
      dist: {
        src: ['js/main.js'],
        dest: 'js/built.js'
      }
    },

    uglify: {
      build: {
        files: {
          'js/built.min.js': ['js/built.js']
        }
      }
    },

   cssmin: {
    build: {
      src: 'css/main.css',
      dest: 'css/main.min.css'
    }
  },

  sass: {
    dev: {
      files: {
         // destination  // source file
        'css/main.css': 'css/main.scss'
        }
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['css', 'js']);
  grunt.registerTask('css', ['sass', 'cssmin']);
  grunt.registerTask('js', ['concat', 'uglify']);

  // Load up tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
};
