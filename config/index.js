module.exports = {
  dev: {
    port: 6010,
    assetsPublicPath: '/',
    proxyTable: {
      '/demo': {
        target: 'http://www.layui.com/', // options.target：目标主机到代理。（协议+主机）
        changeOrigin: true // context：确定应将哪些请求代理到目标主机。（更多关于上下文匹配）
      }
    }
  }
}
