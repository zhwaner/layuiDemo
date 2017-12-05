const gulp = require('gulp')
const eslint = require('gulp-eslint') // https://github.com/adametry/gulp-eslint

let task = {
  run (path, cb) {
    gulp.src([path, '!node_modules/**', '!./src/lib/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result(result => {
      if (result.messages.length) {
        console.log(`# Messages: ${result.messages.length}`)
      }
      if (result.warningCount.length) {
        console.log(`# Warnings: ${result.warningCount}`)
      }
      if (result.errorCount.length) {
        console.log(`# Errors: ${result.errorCount}`)
      }
      if (!result.messages.length) {
        cb && cb()
      }
    }))
  }
}

module.exports = task
