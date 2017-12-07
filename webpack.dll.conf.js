// 1. DllPlugin 与 DllReferencePlugin 需要配合使用.
// 2. DllPlugin 生成资源manifest.json，每一个公共库中的js文件，都会有一个对应的资源ID，同时生成一个打包文件，一般是依赖库:dll.js
//    这个bundle会暴露给全局一个类似require功能的函数，这个全局函数的名字是可以配置的, 比如，可以为 vendorRequire();
// 3. DllReferencePlugin 是在打包过程中使用的，在打包业务代码时，每遇到一个在manifest.json中出现的文件，就可以利用上述 vendor.bundle.js 暴露的全局函数进行相应处理，而不会把这个文件打包进来。
const path = require('path') // 使用 NodeJS 自带的文件路径工具
const webpack = require('webpack')
const es3ifyPlugin = require('es3ify-webpack-plugin') // 解决 es3 语法兼容问题
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js代码

// DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度
function resolve (dir) {
  return path.join(__dirname, dir)// 拼接我们的工作区路径为一个绝对路径
}

module.exports = {
  entry: {
    vendor: [
      'es6-promise',
      'console-polyfill',
      'core-js/fn/object/assign',
      'es5-shim',
      'es5-shim/es5-sham'
    ]
  },
  output: {
    path: resolve('dist/js'),
    filename: 'dll.js',
    library: '[name]_library'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }
    ]
  },
  plugins: [
    new es3ifyPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      libraryTarget: 'commonjs2',
      name: '[name]_library'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: true,
        ecma: 5,
        output: {
          comments: false,
          beautify: false
        },
        warnings: false
      }
    })
  ]
}
