const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const defineConfig = require('../src/defineConfig')

const host = '0.0.0.0'
const port = 3000

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    hrm: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server'
    ]
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: false,
                url: false
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(defineConfig.development)
  ],
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, '../build'),
    publicPath: '/',
    stats: 'errors-only',
    compress: true,
    historyApiFallback: true,
    host: host,
    port: port,
    disableHostCheck: true
  }
};