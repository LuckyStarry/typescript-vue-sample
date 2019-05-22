const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
module.exports = WebpackMerge(webpackConfig, {
  devtool: '#source-map',
  mode: 'development',
  output: {
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, '../output/debug/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: { vue: 'Vue' },
  devServer: {
    contentBase: './output/debug/',
    compress: true,
    port: 30020,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    inline: true,
    historyApiFallback: true
  }
})
