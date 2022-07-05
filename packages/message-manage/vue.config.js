const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')
const { name } = require('./package')

const pageList = getSubDirNameList('src/pages')

const pagesMap = pageList.reduce((prev, page) => {
  prev[page] = {
    title: `message-manage-${page}`,
    entry: `src/pages/${page}/main.js`,
    tempalte: 'public/index.html',
    filename: `${page}/index.html`
  }
  return prev
}, {})

function getSubDirNameList (path) {
  return fs.readdirSync(path, { withFileTypes: true })
          .filter(file => file.isDirectory())
          .map(file => file.name)
}

const publicPath = '/portal-products/basic-console/message-manage/'

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  pages: {
    ...pagesMap
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`
    }
  }
})
