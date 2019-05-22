const path = require('path')
const EncodingPlugin = require('webpack-encoding-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    main: './src/main',
    vendors: './src/vendors'
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.join(__dirname, '../output/dist')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'tslint-loader'
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [new EncodingPlugin({ encoding: 'utf-8' }), new VueLoaderPlugin()],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: { views: path.resolve(__dirname, '../src/views') }
  }
}
