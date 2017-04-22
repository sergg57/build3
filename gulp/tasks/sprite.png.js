'use strict' /* строгость скрипта */


module.exports = function () {
    $.gulp.task('sprite:png', function () {
      return $.gulp.src('./source/sprite/*.png')// папка откуда забираем иконки
      .pipe($.gp.spritesmith({
        imgName: '../img/sprite.png', // какую паку прописываем в свойстве-css:  background-image: url(../img/sprite.png);
        cssName: '../css/sprite.css' // куда складываем sprite.css
      }))
    .pipe($.gulp.dest($.config.root + '/assets/img')); // папка куда складываем sprite.png
    });
};
