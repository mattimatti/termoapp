(function() {
	var config, cordovaServer, path;

	path = require('path');

	cordovaServer = require('./lib/cordova_server');

	config = function(grunt) {
		return {
			connect : {
				options : {
					hostname : '0.0.0.0'
				},
				ios : {
					options : {
						port : 7000,
						middleware : cordovaServer.iOS
					}
				},
				android : {
					options : {
						port : 6000,
						middleware : cordovaServer.android
					}
				},
				web : {
					options : {
						keepalive : true,
						middleware : cordovaServer.web,
						port : 5000
					}
				}
			},
			clean : {
				"default" : {
					options : {
						"no-write" : true
					},
					src : [ "!www/config.xml", "!www/js/spec/index.html",
							"!www/js/spec/lib/*.js", "www/*" ]
				}
			},
			copy : {
				img : {
					files : [ {
						expand : true,
						cwd : 'assets/img/',
						src : [ '**/*' ],
						dest : 'www/img/'
					} ]
				},
				fonts : {
					files : [ {
						expand : true,
						cwd : 'assets/fonts/',
						src : [ '**/*' ],
						dest : 'www/fonts/'
					} ]
				},
				app : {
					files : [ {
						expand : true,
						cwd : 'assets/javascripts/',
						src : [ '**/*' ],
						dest : 'www/'
					} ]
				}
			},
			less : {
				compile : {
					options : {
						paths : [ 'assets/stylesheets' ]
					},
					files : {
						'www/css/main.css' : 'assets/stylesheets/main.less'
					}
				}
			},
			cssmin : {
				compress : {
					files : {
						'www/css/main.css' : [ 'www/css/main.css' ]
					},
					options : {
						keepSpecialComments : 0
					}
				}
			},
			requirejs : {
				cordova : {
					options : {
						mainConfigFile : 'www/js/app/config.js',
						include : [ "main" ],
						insertRequire : [ "main" ],
						findNestedDependencies : true,
						out : 'www/js/cordova.js',
						/* optimize: 'uglify2', */
						wrap : false,
						almond : true,
						preserveLicenseComments : false
					}
				},
				release : {
					options : {
						mainConfigFile : "assets/javascripts/app/config.js",
						generateSourceMaps : true,
						include : [ "main" ],
						insertRequire : [ "main" ],
						out : "assets/javascripts/dist/source.min.js",
						optimize : "uglify2",

						// Since we bootstrap with nested `require` calls this
						// option allows
						// R.js to find them.
						findNestedDependencies : true,

						almond : true,

						// Setting the base url to the distribution directory
						// allows the
						// Uglify minification process to correctly map paths
						// for Source
						// Maps.
						baseUrl : "assets/javascripts/app",

						// Wrap everything in an IIFE.
						wrap : true,

						// Do not preserve any license comments when working
						// with source
						// maps. These options are incompatible.
						preserveLicenseComments : false
					}
				}
			},
			htmlbuild : {
				dist : {
					src : [ 'assets/public/index.html',
							'assets/public/cordova.html' ],
					dest : 'www/',
					options : {
						beautify : true
					}
				}
			},
			mocha_phantomjs : {
				options : {
					reporter : 'dot'
				},
				nerds : [ 'www/js/spec/index.html' ]
			},
			pkg : grunt.file.readJSON('package.json'),
			bump : {
				options : {
					files : [ 'package.json' ],
					updateConfigs : [],
					commit : true,
					commitMessage : 'Release v%VERSION%',
					commitFiles : [ '-a' ],
					createTag : true,
					tagName : 'v%VERSION%',
					tagMessage : 'Version %VERSION%',
					push : true,
					pushTo : 'origin',
					globalReplace : false
				}
			},
			// Run your source code through JSHint's defaults.
			jshint : [ "assets/javascripts/app/**/*.js" ],
			compress : {
				release : {
					options : {
						archive : "assets/javascripts/dist/source.min.js.gz"
					},

					files : [ "dist/source.min.js" ]
				}
			},
			watch : {
				coffee : {
					files : [ 'assets/javascripts/**' ],
					tasks : [ 'copy:app' ]
				},
				less : {
					files : [ 'assets/stylesheets/**/*.less' ],
					tasks : [ 'less' ],
					options : {
						spawn : true
					}
				},
				img : {
					files : [ 'assets/img/**/*' ],
					tasks : [ 'copy:img' ]
				},
				fonts : {
					files : [ 'assets/fonts/**/*' ],
					tasks : [ 'copy:fonts' ]
				},
				htmlbuild : {
					files : [ 'assets/public/**/*.html' ],
					tasks : [ 'htmlbuild' ]
				}
			}
		};
	};

	module.exports = function(grunt) {
		grunt.initConfig(config(grunt));
		grunt.loadNpmTasks('grunt-requirejs');
		grunt.loadNpmTasks('grunt-contrib-coffee');
		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-contrib-copy');
		grunt.loadNpmTasks('grunt-contrib-less');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-cssmin');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-connect');
		grunt.loadNpmTasks('grunt-bump');
		grunt.loadNpmTasks('grunt-mocha-phantomjs');
		grunt.loadNpmTasks('grunt-html-build');
		grunt.registerTask('default', [ 'build' ]);
		grunt.registerTask('build', [ 'clean', 'jshint', 'requirejs:release',
				'copy', 'requirejs:cordova', 'less', 'cssmin', 'htmlbuild' ]);
		grunt.registerTask('server', [ 'copy', 'connect:web' ]);
		return grunt.registerTask('test', [ 'mocha_phantomjs' ]);
	};

}).call(this);
