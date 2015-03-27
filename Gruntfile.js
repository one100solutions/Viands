module.exports = function  (grunt) {
	grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),

	  coffee: {
	  	build: {
	  		expand: true,
	  		cwd: 'src/',
	  		src: ['**/*.coffee'],
	  		dest: './',
	  		ext: '.js'
			}
	  },

	  nodemon: {
	  	dev: {
	  		script: './bin/www',
	  		ignore: ['./src/**']
	  	}
	  },

	   watch: {
	  	 dev: {
	  	 	files: ['./src/**/*.coffee'],
	  		tasks: 'coffee'
	  	 },
	  	 test: {
	  	 	 files: ['./test/**/*.js'],
	  	 	 tasks: 'mochaTest'
	  	 }
	   },

	   mochaTest: {
	   	 test: {
	   	 	 options: {
	   	 	 	 reporter: 'spec',
	   	 	 	 quiet: true
	   	 	 }
	   	 },
	   	 src: ['./test/**/*.js']
	   },

	   concurrent: {
	     target: {
	     	 tasks: ['nodemon', 'watch:dev', 'coffee'],
	     	 options: {
	     	 	 logConcurrentOutput: true
	     	 }
	     }
	   }
	});

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');

	//task setup
	grunt.registerTask('default', ['concurrent:target']);

	grunt.registerTask('test',['mochaTest', 'watch:test']);
};
