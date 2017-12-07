// __dirname 不是变量名，不需要定义，自带，获取根目录

const path = require('path') // 使用 NodeJS 自带的文件路径工具
const webpack = require('webpack')
const es3ifyPlugin = require('es3ify-webpack-plugin') // 解决 es3 语法兼容问题
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js代码

function resolve (dir) {
  return path.join(__dirname, dir)// 拼接我们的工作区路径为一个绝对路径
}

module.exports = {
  entry: '',
  output: {
    path: resolve('dist/js'),
    filename: '[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js'],
    alias: { // 创建import或require的别名
      '@': resolve('src')
    }
  },
  externals: {
    'layui': 'window.layui' // 使用时，依旧用require的方式来使用，webpack不会把它编译进文件里
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: /(node_modules|lib)/
      }
    ]
  },
  externals: {
    'layui': 'window.layui'
  },
  plugins: [
    new webpack.DllReferencePlugin({ // https://segmentfault.com/a/1190000005969643
      context: path.resolve(__dirname, './'), // 对部分不常改动的资源匹配是否打包，减少平时编译的时间
      manifest: require('./vendor-manifest.json')
    }),
    new es3ifyPlugin(),
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
