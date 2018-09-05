'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

//* Создаём задачу для SCRIPTS.

module.exports = function(options) {

  return function() {
  	return gulp.src(options.src, { base: '../src' }) // Выберем js файлы
    	.pipe($.changed(options.dst))                  // Получаем файлы и пропускаем только изменившиеся
    	.pipe($.include())                             // Прогоним через rigger
    	.pipe(gulp.dest(options.dst))                  // Выплюнем файл в built
  };

};