'use strict';

const gulp = require('gulp'),
			del = require('del');

//* Создаём задачу для очистки проекта.

module.exports = function(options) {

  return function() {
  	return del([options.dst], {force: true});
  };
  
};