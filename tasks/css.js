const gulp = require('gulp')
const glob = require('glob')
const sass = require('gulp-sass')
const rename = require('gulp-rename') // 修改文件名：common.enter.css改为common.css
const notify = require('gulp-notify') // 显示报错信息和报错后不终止当前gulp任务
const plumber = require('gulp-plumber') // 构建异常捕获，防止构建进程崩掉
const postcss = require('gulp-postcss') // 对css文件进行处理
const autoprefixer = require('autoprefixer') // PostCSS插件：自动给css样式添加autofixer前缀
const cssnano = require('cssnano')({ // PostCSS插件：执行各种优化，删除空白和注释，并且压缩代码,如果用webpack的话，css-loader集成了cssnano，你不需要再次引入
  discardComments: { removeAll: true },
  // 避免 cssnano 重新计算 z-index
  safe: true
})
const sprites = require('postcss-sprites') // PostCSS插件：自动制作雪碧图

const config = {
  autoprefixer: {
    browsers: ['last 10 version'], // 兼容主流浏览器的最新10个版本
    cascade: false, // 是否美化属性值 默认：true
    remove: false // 是否去掉不必要的前缀 默认：true
  }
}

let task = {
  run (handlePath) {
    glob.sync(handlePath).forEach(path => { // glob.sync同步获取匹配文件列表，异步是通过函数回调返回文件路径
      let pathArr = path.split('/')
      let dirname = pathArr[pathArr.length - 2]

      gulp.src(path)
      .on('end', () => {
        console.log(`css task done!`)
      })
      .pipe(plumber({ errHandler: notify.onError('Error: <%=error.message %>') }))
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([
        autoprefixer(config.autoprefix),
        cssnano,
        sprites({
          stylesheetPath: './dist/css',
          spritePath: './dist/icons/' + dirname,
          filterBy: function (image) {
            if (image.url.indexOf('images/') === -1) {
              return Promise.resolve()
            } // 如果是images不是icons，不制作雪碧图
          }
        })
      ]))
      .pipe(rename(path => {
        path.basename = path.basename.split('.')[0]
      }))
      .pipe(gulp.dest('./dist/css'))
    })
  }
}

module.exports = task
