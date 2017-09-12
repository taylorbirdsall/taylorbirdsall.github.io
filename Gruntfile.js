module.exports = function(grunt) {
  grunt.initConfig({

    uglify: {
      build: {
        files: {
          'build/bundle.min.js': ['build/bundle.js']
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
        'css/main.css': 'sass/main.scss'
        }
      }
    }
  });

  // Default task
  grunt.registerTask('default', ['css', 'js']);
  grunt.registerTask('css', ['sass', 'cssmin']);
  grunt.registerTask('js', ['uglify']);

  // Load up tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
