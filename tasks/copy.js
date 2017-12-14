const gulp = require('gulp')

let task = {
  run (path, dist, msg) {
    gulp.src(path)
      .on('end', () => {
        console.log(msg)
      })
      .pipe(gulp.dest(dist))
  }
}

module.exports = task
