module.exports = function(grunt) {

	grunt.initConfig({

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					"../www/css/style.min.css": "../www/css/sass/style.scss"
				}
			}
		},

		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			app: {
				files: {
					'../www/js/min/app.annotated.js': ['../www/js/**/*.js', '!../www/js/min/*.js']
				}
			}
		},

		uglify: {
			my_target: {
				files: {
					'../www/js/min/app.min.js': ['../www/js/min/app.annotated.js']
				}
			},
			// lib_target: {
			// 	mangle: false,
			// 	files: {
			// 		'../www/js/min/lib.min.js': ['../www/js/lib/*.js']
			// 	}
			// }
		},
		
		watch: {
			css: {
				files: "../www/css/sass/*.scss",
				tasks: ["sass"]
			},
			js: {
				files: ["../www/js/**/*.js", '!../www/js/min/*.js'],
				tasks: ['ngAnnotate', 'uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-ng-annotate');
	//grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('default', ['watch']);
};