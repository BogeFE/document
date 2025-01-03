# webpack

## 目录

- webpack 编译原理

- webpack Loader & Plugin

- webpack 性能调优

- 热更新原理

- [webpack5 新特性](https://juejin.cn/post/7268540338451890176)

- webpack VS Vite

## 五大概念

- Entry —— 入口，指示 webpack 从哪个文件开始打包

- Output —— 输出，指示 webpack 打包后的文件输出到哪个目录

- Loader —— 模块转换器，用于将不同类型的模块转换为 webpack 可以处理的模块，webpack 本身只能处理 js / json 等资源

  - 分类 —— pre & normal & inline & resource

  - 执行顺序 —— pre → normal → inline → resource，相同优先级的 loader 从右往左执行

  - Loader API

- Plugin —— 插件，用于扩展 webpack 的功能，webpack 本身提供了一些内置插件，也可以通过 npm 安装第三方插件

  - 工作机制 —— 在 webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果

  - webpack 内部钩子 —— tapable

- Mode —— 模式，用于指定构建环境，webpack 会根据不同的模式进行不同的优化，如开发环境下会启用 SourceMap，生产环境下会启用 Tree Shaking

## 基础认知

- 为什么需要打包工具 —— 将 Vue/React 等框架、ES6 模块化、CSS 预处理器等等转换为浏览器可以运行的 js 代码

- 基本功能

  - 开发模式 —— 仅编译 ES Module 语法

  - 生产模式 —— 编译 ES Module 语法，压缩 js 代码

- devServer 开发服务器 —— 自动化重新编译打包、自动刷新浏览器

- 提升开发体验 —— source map，建立了构建后的代码与原始源代码之间的映射关系

  ```js
  // webpack.config.js
  module.exports = {
    devtool: 'inline-source-map', // 开启 source map
  }
  ```

- 提升打包构建速度

  - Hot Module Replacement —— 热更新，只重新编译打包更新变化了的代码，不变的代码使用缓存

  - Oneof —— 排除已经被其他 loader 处理过的文件

  - Include / Exclude —— include 和 exclude 选项用于指定哪些文件需要被处理和哪些文件不需要被处理

  - Cache —— 缓存 eslint & babel 处理结果，

  - Thead —— 开启多进程打包

- 减少代码体积

  - Tree Shaking —— 去除无用的并未被使用的 js 代码

    ```js
    module.exports = {
      optimization: {
        usedExports: true,
      },
    }
    ```

    - webpack 会标记所有 import 语句 & export 语句

    - 确定某个模块没没有被导入时会在生成的 bundle 中移除这个模块的代码

    - 递归进行标记清理，确保没有被标记的模块不会出现在最终的 bundle 中

    - 需要确保使用了 ES Module 语法

  - @babel/plugin-transform-runtime —— 减少代码体积

  - Image Minimizer —— 压缩本地静态图片

  - 利用生产模式压缩代码

  - 利用 CDN 加速

- 优化代码运行性能

  - Code Splitting —— 代码分割

  - Preload / Prefetch —— 预加载 / 预获取，对代码进行提前加载

  - Network Cache ——

  - Core-js —— 对 js 进行兼容性处理

  - PWA —— 让代码可离线访问

## 常用配置

- entry

- output

  - path

  - filename

  - publicPath

- module —— 配置 loader

- plugins —— 配置插件

- resolve —— 解析模块依赖

  - extensions —— 设置文件扩展名解析顺序

  - alias —— 别名

- devServer

- optimization —— 配置优化策略

- performance —— 输出文件的性能检查配置

## 面试题

1. webpack Module 和 Chunk 有什么区别 —— 我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle

  - module 是 webpack 中最小的编译单元，它可以是一个文件（如 js、css、图片等），也可以是一个模块（如 ES Module）

  - webpack 在进行打包时，会根据文件的依赖关系，将不同的 组合成一个或多个 chunk

  - bundle 是由一个或者多个 chunk 组成的集合

    ![](https://image-1255652541.cos.ap-shanghai.myqcloud.com/uPic/image-20200518210532171.png)

2. webpack 5 模块联邦的使用场景

3. vite 开发环节为什么比 webpack 快

  - 开发模式 —— webpack 先打包再启动开发服务器 ｜ vite 直接启动开发服务器，再按需编译依赖文件

  - 对 ES Module 语法的处理

    - webpack 会先打包再交给浏览器执行

    - vite 直接将开发环境下的模块文件作为浏览器要执行的文件

  - 底层语言
    
    - webpack 基于 Node.js 构建，是 **毫秒** 级别的
    
    - Vite 基于 ESBuild 构建，ESBuild 是一个基于 Go 语言编写的高性能构建工具，是 **纳秒** 级别的

  - 热更新处理

    - webpack 会重新编译发生变化的模块

    - vite 会让浏览器重新请求发生变化的模块

4. webpack 性能调优手段

- 代码分割 Code Splitting —— 实现按需加载，减少初始加载时间

-

5. Loader 和 Plugin 的区别

- Loader 本质是一个函数，作用是转换器 ｜ Pulgin 本质是一个类 class，作用是扩展 webpack 功能

- 用法上的区别

  - Loader 配置在 module.rules 中 ｜ Plugin 配置在 plugins 中

  - Loader 类型是一个对象数组，每个对象描述对于什么文件使用什么 loader ｜ Plugin 类型是一个数组，每个元素是一个 Plugin 实例

## webpack 热更新

- Hot Module Replacement,HMR

- 基于 Webpack-dev-server，局部刷新页面上发生变化的模块

- 作为一个 Webpack 内置的功能，可以通过 HotModuleReplacementPlugin 或--hot 开启

- 原理

  - webpack-dev-server（WDS）和浏览器之间维护了一个 websocket 服务

  - 当本地资源发生变化后，webpack 会先将打包生成新的模块代码放入内存中

  - WDS 向浏览器推送更新，并附带上构建时的 hash，让客户端和上一次资源进行对比更新

### webpack-dev-server

- 基本工作

  1. 启动 webpack，生成 compiler 实例

  2. 使用 express 框架启动本地 server

  3. 再启动 websocket 服务 —— 建立本地服务与浏览器的双向通信

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
