const path = require('path')
const package = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const WebpackMerge = require('webpack-merge')
const webpackConfig = require('./webpack.config')

module.exports = WebpackMerge(webpackConfig, {
  mode: 'production',
  output: {
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, '../output/release/dist'),
    publicPath: `/dist`,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: { loaders: { ts: ['babel-loader', 'ts-loader'] } }
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        common: false,
        styles: {
          name: 'main',
          test: /\.(css|less)$/,
          chunks: 'all',
          minChunks: 1,
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
    new HtmlWebpackPlugin({
      // eslint-disable-next-line no-undef
      filename: path.join(__dirname, '../output/release/index.html'),
      template: './src/views/index.ejs',
      inject: false
    })
  ],
  externals: { vue: 'Vue' }
})
