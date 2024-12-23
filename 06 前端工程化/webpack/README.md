# webpack

## 目录

- webpack 编译原理

- webpack Loader & Plugin

- webpack 性能调优

- 热更新原理

- webpack5 新特性

- webpack VS Vite

## 面试题

1. webpack Module 和 Chunk 有什么区别

2. webpack 5 模块联邦的使用场景

3. vite 开发环节为什么比 webpack 快

4. webpack 性能调优手段

## webpack 热更新

- Hot Module Replacement,HMR

- 基于 Webpack-dev-server，局部刷新页面上发生变化的模块

- 作为一个 Webpack 内置的功能，可以通过 HotModuleReplacementPlugin 或--hot 开启

### webpack-dev-server

- 基本工作

  1. 启动 webpack，生成 compiler 实例

  2. 使用 express 框架启动本地 server

  3. 再启动 websocket 服务 —— 建立本地服务与浏览器的双向通信

-

## 项目分析

### global-developer-station

- Service Worker —— `workbox-webpack-plugin`

  - 对 js & css 文件进行缓存

- BundleAnalyzerPlugin —— `webpack-bundle-analyzer`

- lintOnSave

- assetsDir

- productionSourceMap —— 生产环境的 source map

- configureWebpack —— 一个会被合并入最终 webpack 配置的对象

  - resolves > alias —— 创建别名

  - plugins —— GenerateSW

- css > loaderOptions > sass

- devServer > disableHostCheck

- chainWebpack

  - html-loader

  - mardown-loader

  - @kazupon/vue-i18n-loader

  - 修改 definePlugin

  - 修改 webpack-report —— `config.plugin('webpack-report').use(BundleAnalyzerPlugin)`

### fcm-push-fe

- ❗️mode

- bail

- ❗️devtool —— 配置 Source Map 的生成方式。

- ❗️entry

  - source-map

  - cheap-module-source-map

- ❗️output

  - path

  - pathinfo

  - filename

  - futureEmitAssets

  - chunkFilename

  - publicPath

  - devtoolModuleFilenameTemplate

  - jsonpFunction

  - globalObject

- optimization

  - ❗️minimize —— 是否启用代码压缩。

  - ❗️minimizer —— 指定用于压缩代码的插件

  - ❗️TerserPlugin —— 用于压缩 JavaScript 代码，它是 Webpack 默认的压缩插件，支持多线程并行压缩。

  - ❗️OptimizeCSSAssetsPlugin —— 用于优化和压缩 CSS 文件，通常与 MiniCssExtractPlugin 一起使用，以确保 CSS 文件的最小化

  - ❗️splitChunks —— 自动分割代码，优化缓存

  - ❗️runtimeChunk —— 将运行时代码分离，以实现长期缓存

- resolve

  - ❗️modules —— 设置模块解析的优先级路径。

  - ❗️extensions —— 设置文件扩展名解析顺序。

  - ❗️alias

  - PnpWebpackPlugin

  - ModuleScopePlugin —— 限制模块导入范围

- resolveLoader —— PnpWebpackPlugin.moduleLoader ——

- module

  - strictExportPresence

  - rules

- plugins

  - ❗️BundleAnalyzerPlugin —— 用于分析和可视化 Webpack 输出文件的大小，它生成一个 HTML 报告，显示每个模块的大小，有助于优化打包结果。

  - ❗️HtmlWebpackPlugin —— 用于生成 HTML 文件并自动注入打包后的资源，它可以基于模板生成 HTML 文件，适用于单页应用和多页应用。

  - ❗️ForkTsCheckerWebpackPlugin —— 用于 TypeScript 类型检查

  - ❗️ReactRefreshWebpackPlugin —— 用于 React 的快速刷新。
  
  - ❗️DefinePlugin —— 定义环境变量。

  - ❗️HotModuleReplacementPlugin —— 启用热模块替换。

  - ❗️MiniCssExtractPlugin —— 用于将 CSS 提取到单独的文件中，而不是内联在 JavaScript 中。适用于生产环境，减少 CSS 的加载时间。
  
  - InlineChunkHtmlPlugin —— 将内联的 Webpack 运行时注入到 HTML 中，减少额外的 HTTP 请求，适用于小型项目或需要优化初始加载时间的项目。

  - InterpolateHtmlPlugin —— 用于在 HTML 文件中插入变量，通常与 HtmlWebpackPlugin 一起使用，支持在 HTML 模板中使用环境变量。

  - ModuleNotFoundPlugin —— 用于处理模块未找到的错误，提供更友好的错误提示，帮助开发者快速定位问题。

  - CaseSensitivePathsPlugin —— 确保路径大小写敏感，防止由于大小写问题导致的模块找不到的错误，特别是在跨平台开发时非常有用。

  - WatchMissingNodeModulesPlugin —— 用于监视缺失的 Node 模块，当模块缺失时自动重新安装，适用于开发环境，提高开发效率。


  - ManifestPlugin —— 用于生成资源清单文件，记录每个打包后的文件名及其对应的原始文件名

  - IgnorePlugin —— 忽略特定模块（如 Moment.js 的 locale 文件）。

  - GenerateSW —— 用于 PWA（Progressive Web App）支持，生成 Service Worker 文件，实现离线缓存和资源预缓存，提高应用的可靠性和性能。

  - filter(Boolean)

- node —— 为某些 Node 模块提供空的 mock

- performance —— 关闭性能提示
