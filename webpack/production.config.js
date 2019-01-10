const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const defineConfig = require('../src/defineConfig')

module.exports = {
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
    new webpack.DefinePlugin(defineConfig.production),
    new ExtractTextPlugin('css/[name].css'),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
