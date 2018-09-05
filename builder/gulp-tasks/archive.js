'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

//* Создаём задачу для архивации проекта.

module.exports = function(options) {

  return function() {
  	return gulp.src(options.src)
    	.pipe($.zip('Project.zip'))
    	.pipe(gulp.dest(options.dst));
  };
  
};