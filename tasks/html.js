const gulp = require('gulp')
const glob = require('glob') // glob.sync同步的获取文件列表
const fileInclude = require('gulp-file-include') // 通过Gulp Include文件
const gulpReplace = require('gulp-replace') // 字符串替换插件
const htmlbeautify = require('gulp-html-beautify') // 格式化插件
const htmlmin = require('gulp-htmlmin') // 格式化插件

const beautifyOptions = {
  indent_size: 2,
  indent_char: ' ',
  // 这里是关键，可以让一个标签独占一行
  unformatted: true,
  // 默认情况下，body | head 标签前会有一行空格
  extra_liners: []
}

const minOptions = {
  removeComments: true // 清除HTML注释
  // collapseWhitespace: true, // 压缩HTML
  // minifyJS: true, // 压缩页面JS
  // minifyCSS: true // 压缩页面CSS
}

let task = {
  run (handlePath, cb) {
    console.log(glob.sync(handlePath))
    glob.sync(handlePath).forEach(path => {
      let pageName = path.split('/').pop().split('.')[0]
      gulp.src(path)
        .on('end', () => {
          cb && cb()
          console.log(`html task ${pageName} done!`)
        })
        .pipe(fileInclude({
          prefix: '@@',
          basepath: './src/common/include/'
        }))
        .pipe(gulpReplace('<!-- page css -->', `<link rel="stylesheet" href="css/${pageName}.css">`))
        .pipe(gulpReplace('<!-- page js -->', `<script src="js/${pageName}.js"></script>`))
        .pipe(htmlbeautify(beautifyOptions))
        .pipe(htmlmin(minOptions))
        .pipe(gulp.dest('dist'))
    })
  }
}

module.exports = task
