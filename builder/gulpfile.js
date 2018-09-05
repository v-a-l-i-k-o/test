'use strict';

const gulp = require('gulp'),
      watch = require('gulp-watch');

//* Записываем в переменную пути к нашим файлам.

const path = {
  src: {
    fonts :                             '../src/fonts/**/*.*',
    html  :                         '../src/templates/*.html',
    img   :                   '../src/img/{bg,icons,tmp}/*.*',
    css   :                  '../src/styles/main.scss',
    js    : '../src/{js/libs/*.*,js/plugins.js,js/scripts.js}'
  },

  dest: '../built',

  watch: {
    styles: '../src/styles/**/*.scss',
    fonts :            '../src/fonts/**/*.*',
    html  :     '../src/templates/**/*.html',
    img   :  '../src/img/{bg,icons,tmp}/*.*',
    js    :               '../src/js/**/*.js'
  }
};

//* Создаём функцию для подгрузки задач из внешнего файла gulp-tasks

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
};

lazyRequireTask('html:build', './gulp-tasks/html_build', {
  src: path.src.html,
  dst: path.dest
});

lazyRequireTask('js:build', './gulp-tasks/js_build', {
  src: path.src.js,
  dst: path.dest
});

lazyRequireTask('styles:build', './gulp-tasks/styles_build', {
  src: path.src.css,
  dst: path.dest + '/css/'
});

lazyRequireTask('img:build', './gulp-tasks/img_build', {
  src: path.src.img,
  dst: path.dest
});

lazyRequireTask('fonts:build', './gulp-tasks/fonts_build', {
  src: path.src.fonts,
  dst: path.dest
});

lazyRequireTask('server', './gulp-tasks/server', {
  src: path.dest
});

lazyRequireTask('clean', './gulp-tasks/clean', {
  dst: path.dest
});

lazyRequireTask('archive', './gulp-tasks/archive', {
  src: path.dest + '/**/*.*',
  dst: '../'
});

//* Создаём общую задачу для последовательного
//  запуска следующих задач:
//  HTML, STYLES, SCRIPTS, IMAGES, FONTS.

gulp.task('build', function () {
  gulp.start('html:build', 'styles:build', 'js:build', 'img:build', 'fonts:build');
});

//* Создаём задачу для наблюдения за файлами.

gulp.task('watch', function (){
  watch([path.watch.html], function () { gulp.start('html:build'); });
  watch([path.watch.styles], function () { gulp.start('styles:build'); });
  watch([path.watch.js], function () { gulp.start('js:build'); });
  watch([path.watch.img], function () { gulp.start('img:build'); });
  watch([path.watch.fonts], function () { gulp.start('fonts:build'); });
});

//* Создаём задачу для наблюдения за файлами
//  после сборки и запуска локального сервера.

gulp.task('watch-server', ['build'], function () {
  gulp.start('watch', 'server');
});

//* Создаём задачу для пересборки проекта.

gulp.task('rebuild', ['clean'], function () {
  gulp.start('build');
});

//* Создаём задачу для развёртывания рабочего окружения.

gulp.task('default', ['clean'], function () {
  gulp.start('build', 'watch', 'server');
});
