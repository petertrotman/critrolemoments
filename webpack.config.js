const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // common: [
    //   'react', 'react-dom',
    // ],
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index.js',
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.[hash].js',
    publicPath: '/',
  },

  resolve: {
    alias: {
      svg: path.join(__dirname, 'static', 'svg'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },

      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html.ejs',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'static'),
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    port: 9000,
    publicPath: 'http://localhost:9000/',
  },
};
