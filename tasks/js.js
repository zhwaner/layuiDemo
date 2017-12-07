const glob = require('glob')
const webpack = require('webpack')

let task = {
  run (path, cb) {
    var config = require('./../webpack.config.js')
    var getEntry = function () {
      let entry = {}
      glob.sync(path).forEach(name => {
        let path = name.split('/')
        entry[path[path.length - 2]] = name
      })
      return entry
    } // 返回类似index: 'E:/keywaProject/front-end/hazardous/src/app/index/index.enter.js'

    config.entry = getEntry()

    webpack(config, function (err, stats) {
      if (err) {
        console.log(err)
      }
      console.log(`webpack done!`)
      cb && cb()
    })
  }
}

module.exports = task
