'use strict';

const gulp = require('gulp'),
			$ = require('gulp-load-plugins')(),
			combiner = require('stream-combiner2').obj;

const isDevelopment = !process.env['NODE_ENV'] || process.env['NODE_ENV'] == 'development'; 

//* Создаём задачу для STYLES.

module.exports = function(options) {

  return function() {
  	return combiner(
    	gulp.src(options.src),                   // Выберем файл main.scss
    	$.if(isDevelopment, $.sourcemaps.init()),  // Создаём file.sourceMap
    	$.sass(),                                // Компилируем через препроцессор
    	$.autoprefixer({
      	browsers: ['last 3 versions', '> 1%', 'ie 9'],
      	cascade: false
    	}),                                      // Добавим вендорные префиксы
    	$.rename('styles.css'),                  // Переименуем
    	gulp.dest(options.dst),                  // Выплюнем в build
    	$.cssnano({
        zindex: false,
        reduceIdents: false
      }),                                      // Сожмём файл
    	$.rename({suffix: '.min'}),              // Переименуем
    	$.if(isDevelopment, $.sourcemaps.write()), // Добавляем sourceMap в файл
    	gulp.dest(options.dst)                   // Выплюнем в build
  	).on('error', $.notify.onError(function(err) {
    	return {
      	title: 'CSS',
      	message: err.message
    	};
  	})); // Обворачиваем поток и вешаем обработчик ошибок
  };

};