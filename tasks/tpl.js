const gulp = require('gulp')
const tmod = require('gulp-tmod') // TmodJS和artTemplate语法一脉相承

let task = {
  run (path, cb) {
    var pathArr = path.split('\\')
    var tplName = pathArr[pathArr.length - 3] // 获取所在目录名，such as index
    pathArr.pop()
    var tplPath = pathArr.join('/')
    var distUrl = './src/app/' + tplName + '/js' // tpl打包到js目录tpl.js
    if (/common/.test(pathArr)) {
      distUrl = './src/common/js'
    }

    gulp.src([tplPath + '/*.tpl'])
    .on('end', () => {
      cb && cb()
    })
    .pipe(tmod({
      'templateBase': tplPath,
      'runtime': 'tpl.js', // 输出时的运行名称
      'combo': true, // 是否合并模板
      'cache': false, // 是否开启编译缓存
      'syntax': 'simple' // 定义模板采用哪种语法，可选：simple、native
    }))
    .pipe(gulp.dest(distUrl))
  }
}

module.exports = task
