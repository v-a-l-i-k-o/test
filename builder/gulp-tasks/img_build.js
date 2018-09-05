'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')(),
			imageminJpegtran = require('imagemin-jpegtran'),
      imageminGifsicle = require('imagemin-gifsicle'),
      imageminOptipng  =  require('imagemin-optipng'),
      imageminSvgo     =     require('imagemin-svgo');
			
//* Создаём задачу для IMAGES.

module.exports = function(options) {

  return function() {
  	return gulp.src(options.src, { base: '../src' }) // Выберем картинки
    	.pipe($.changed(options.dst))                  // Получаем файлы и пропускаем только изменившиеся
    	.pipe($.imagemin({
      	use: [imageminOptipng()],
      	use: [imageminJpegtran()],
      	use: [imageminGifsicle()],
      	use: [imageminSvgo()]
    	}))                                            // Оптимизируем файлы
    	.pipe(gulp.dest(options.dst))                  // Выплюнем в build
  };

};