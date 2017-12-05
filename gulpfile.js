const gulp = require('gulp')
const htmlTask = require('./tasks/html')
const cssTask = require('./tasks/css')
const tplTask = require('./tasks/tpl')
const jsTask = require('./tasks/js')
const eslintTask = require('./tasks/eslint')

gulp.task('default', () => {
  gulp.watch(['./src/app/**/*.html'], (event) => {
    htmlTask.run(event.path)
  })
  gulp.watch(['./src/**/**/*.enter.scss'], (event) => {
    cssTask.run(event.path)
  })
  gulp.watch(['./src/common/scss/*.scss'], (event) => {
    cssTask.run('./src/common/common.enter.scss')
  })
  gulp.watch(['./src/app/**/*.tpl', './src/common/**/*.tpl'], (event) => {
    tplTask.run(event.path)
  })
  gulp.watch(['./src/**/**/*.enter.js'], (event) => {
    eslintTask.run(event.path, () => {
      jsTask.run(event.path) // 回调
    })
  })
})

gulp.task('html', () => {
  htmlTask.run('./src/app/**/*.html')
})
gulp.task('css', () => {
  cssTask.run('./src/**/**/*.enter.scss')
})
