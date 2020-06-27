module.exports = {
  // 输出文件根路径
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  // 输出文件目录
  outputDir: 'dist',
  // 入口文件输出路径
  indexPath: 'index.html',
  // 文件哈希值
  filenameHashing: true,
  // 配置多页面应用
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: 'src/index/main.js',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'Index Page',
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   // 当使用只有入口的字符串格式时，
  //   // 模板会被推导为 `public/subpage.html`
  //   // 并且如果找不到的话，就回退到 `public/index.html`。
  //   // 输出文件名会被推导为 `subpage.html`。
  //   subpage: 'src/subpage/main.js'
  // },
  // 启用lint
  lintOnSave: 'error',
  // 显式转义node_modules中的模块，默认忽略这个文件夹的
  transpileDependencies: [],
  // 生产环境的source map
  productionSourceMap: true,
  // webpack配置
  configureWebpack: {},
  // style文件配置
  // css: {
  //   loaderOptions: {
  //     css: {
  //       // 这里的选项会传递给 css-loader
  //     },
  //     postcss: {
  //       // 这里的选项会传递给 postcss-loader
  //     }
  //   }
  // },
  // webpack-dev-server配置兼容
  devServer: {
    // 开发环境代理服务器 http-proxy-middleware
    // proxy: 'http://localhost:8080',
  },
  // PWA插件
  pwa: {},
}
