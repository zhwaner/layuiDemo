const gulp = require('gulp')
const htmlTask = require('./tasks/html')
const cssTask = require('./tasks/css')
const tplTask = require('./tasks/tpl')
const jsTask = require('./tasks/js')
const eslintTask = require('./tasks/eslint')
const copyTask = require('./tasks/copy')
const serverTask = require('./tasks/server')

gulp.task('default', ['copyLib', 'copyImages'], () => {
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
    copyTask.run(event.path)
  })
  gulp.watch(['./src/app/**/**/*.tpl', './src/common/**/*.tpl'], (event) => {
    tplTask.run(event.path)
  })
  gulp.watch(['./src/**/**/*.enter.js'], (event) => {
    eslintTask.run(event.path, () => {
      jsTask.run(event.path) // 回调
    })
  })
  gulp.watch(['./dist/*.html', './dist/css/*.css', './dist/js/*.js'], (event) => {
    if (/lib/.test(event.path)) {
      return
    }
    if (/images/.test(event.path)) {
      return
    }
    if (/release/.test(event.path)) {
      return
    }
    serverTask.run(event.path)
  })
})

gulp.task('all', ['copyLib', 'copyImages', 'html', 'css', 'js'], () => {
  console.log('html-css-js all done!')
})

gulp.task('html', () => {
  htmlTask.run('./src/app/**/*.html')
})
gulp.task('css', () => {
  cssTask.run('./src/**/**/*.enter.scss')
})
gulp.task('js', () => {
  jsTask.run('./src/**/**/*.enter.js')
})

gulp.task('copyLib', () => {
  copyTask.run('./src/lib/**/*', './dist/lib', 'lib copyed!')
})
gulp.task('copyImages', () => {
  copyTask.run('./src/common/images/**/*', './dist/images', 'images copyed!')
})
