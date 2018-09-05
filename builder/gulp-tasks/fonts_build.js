'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')();

//* Создаём задачу для FONTS.

module.exports = function(options) {

  return function() {
  	return gulp.src(options.src, { base: '../src' }) // Выберем шрифты
    	.pipe($.changed(options.dst))                  // Получаем файлы и пропускаем только изменившиеся
    	.pipe(gulp.dest(options.dst))                  // Выплюнем в build
  };

};