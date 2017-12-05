const gulp = require('gulp')

let task = {
  run (handlePath) {
  	console.log(handlePath)
    // glob.sync(handlePath).forEach(path => {
    //   let pageName = path.split('/').pop().split('.')[0]
    //   gulp.src(path)
    //     .on('end', () => {
    //       console.log(`html task ${pageName} done!`)
    //     })
    //     .pipe(fileInclude({
    //       prefix: '@@',
    //       basepath: './src/common/include/'
    //     }))
    //     .pipe(gulpReplace('<!-- page css -->', `<link rel="stylesheet" href="css/${pageName}.css">`))
    //     .pipe(gulpReplace('<!-- page js -->', `<script src="js/${pageName}.js"></script>`))
    //     .pipe(htmlbeautify(beautifyOptions))
    //     .pipe(htmlmin(minOptions))
    //     .pipe(gulp.dest('dist'))
    // })
  }
}

module.exports = task
