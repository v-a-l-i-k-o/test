'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

//* Создаём задачу для HTML.

module.exports = function(options) {

  return function() {
  	return gulp.src(options.src)    // Выберем html файлы по нужному пути
    	.pipe($.include())            // Прогоним через rigger
    	.pipe(gulp.dest(options.dst)) // Выплюнем файлы в папку built
  };
  
};