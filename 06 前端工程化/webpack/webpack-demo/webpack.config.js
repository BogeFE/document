const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // entry: './src/index.js',
  entry: {
    index: './src/index.js',
    // print: './src/print.js',
    // another: './src/another-module.js',

    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared',
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared',
    // },
    // shared: 'lodash',
  },
  // 开发环境中使用 source map 来定位错误
  devtool: 'inline-source-map',
  plugins: [
    // 使用 HtmlWebpackPlugin 可以生成一个新的 index.html 文件，并自动引入打包生成的所有资源
    new HtmlWebpackPlugin({
      title: 'development',
    }),
  ],
  output: {
    // filename: 'bundle.js',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    // 在每次构建之前清空 dist 文件夹
    clean: true,
  },
  // optimization: {
  //   // SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
}
