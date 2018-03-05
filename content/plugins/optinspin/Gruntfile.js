module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "js": {
                "src": ["assets/js/admin-script.js", 
						"assets/js/draggable.js", 
						"assets/js/Spin2WinWheel.js", 
						"assets/js/textplugin.js", 
						"assets/js/ThrowPropsPlugin.min.js", 
						"assets/js/tweenmax.js", 
						"assets/js/wheel-script.js", 
						"assets/js/winwheel.js",
						"assets/js/index.js",
						"assets/js/script.js"
						],
                "dest": "assets/js/allscripts.js"
            },		
			"css": {
                "src": ["assets/css/admin-style.css", "assets/css/style.css", "assets/css/wheel-style.css"],
                "dest": "assets/css/style.min.css"
            }
        },
		watch: {
		  js: {
			files: ['assets/js/**/*.js'],
			tasks: ['concat:js'],
		  },
		  css: {
			files: ['assets/css/**/*.css'],
			tasks: ['concat:css'],
		  },		  
		},
		uglify: {
			my_target: {
			  files: {
				'assets/js/optinspin-merge.js': ['assets/js/allscripts.js']
			  }
			}
		  },
			cssmin: {
			  target: {
				files: {
				  'assets/css/optinspin-merge.css': ['assets/css/style.min.css']
				}
			  }
			}		  
		
		//cssmin: {
		
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-concat');
	//auto updated the code css and js
	grunt.loadNpmTasks('grunt-contrib-watch');
	//minify js and css
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//default run functions
	grunt.registerTask('default',['concat','watch']);

};