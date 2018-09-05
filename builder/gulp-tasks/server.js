'use strict';

const gulp = require('gulp'),
			bs = require('browser-sync').create();

//* Создаём задачу для инициализации
//  и запуска локального сервера.

module.exports = function(options) {

  return function() {
  	bs.init({
  		server: {
    		baseDir: options.src
  		},
  		port: 1988,
  		host: 'localhost',
  		logPrefix: 'v-a-l-i-k-o',
			browser: "chrome"
  	});

  	bs.watch(options.src).on('change', bs.reload);
  };

};
