// 让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面
const browserSync = require('browser-sync').create() // 创建Browsersync实例
const proxyMiddleware = require('http-proxy-middleware')

let task = {
  run (handlePath, cb) {
    var pathArr = handlePath.split('\\')
    var fileName = pathArr[pathArr.length - 1].split('.')[0]
    var fileType = pathArr[pathArr.length - 1].split('.')[1]

    var middleware = []
    var proxyTable = require('./../config/index.js').dev.proxyTable

    Object.keys(proxyTable).forEach(function (context) {
      var options = proxyTable[context]
      middleware.push(proxyMiddleware(context, options))
    })

    // 如果修改的是公用的样式，reload common.css
    if (fileName === 'common' && fileType === 'css' && browserSync.active) {
      browserSync.reload('css/common.css')
      return
    }

    // 如果是第一次编辑文件，编辑目录路径
    if (!global.browserSyncCurrentPath) {
      global.browserSyncCurrentPath = fileName
    }

    // 没有开启browserSync的时候
    if (!browserSync.active && fileName !== 'common') {
      // http://www.browsersync.cn/docs/options/
      browserSync.init({ // .init 启动服务器
        server: {
          baseDir: './dist/',
          index: global.browserSyncCurrentPath + '.html',
          middleware: middleware
        }
      })
    } else {
      // 如果已经开启了browserSync，并且编辑的是同一个资源的路径，直接更新对应的文件
      if (global.browserSyncCurrentPath === fileName) {
        // css支持hmr -- hot module replacement
        var path = fileType === 'html' ? fileName + '.' + fileType : fileType + '/' + fileName + '.' + fileType
        browserSync.reload(path)
      } else {
        // 编辑其他页面资源是，先退出当前的，重新初始化
        browserSync.exit()
        // 更新
        global.browserSyncCurrentPath = fileName
        browserSync.init({
          server: {
            baseDir: './dist/',
            port: 9523,
            index: global.browserSyncCurrentPath + '.html',
            middleware: middleware // 自定义中间件
          }
        })
      }
    }
  }
}

module.exports = task
