const { defineConfig } = require('@vue/cli-service')

const publicPath = '/portal/'

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath,
  devServer: {
    proxy: {
      '^/portal-products/basic-console/message-manage': {
        target: 'http://localhost:8081/',
        ws: false,
        changeOrigin: true
      },
    }
  }
})
