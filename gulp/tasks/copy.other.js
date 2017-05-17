'use strict';

module.exports = function() {
  $.gulp.task('copy:other', function() {
    //return $.gulp.src(['./source/**/*.*', '!./source/fonts/**/*.*', '!./source/images/**/*.*','!./source/js/**/*.*',
    //                  '!./source/sprite/**/*.*','!./source/style/**/*.*','!./source/template/**/*.*'])
    return $.gulp.src(['./source/**/*.*', '!./source/fonts/**/*.*', '!./source/images/**/*.*','!./source/sprite/**/*.*','!./source/style/**/*.*','!./source/template/**/*.*'])

        .pipe($.gulp.dest($.config.root));
  });
};
