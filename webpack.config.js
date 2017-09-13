const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');

let config;

const devConfig = {
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index.js',
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
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
        loader: 'svg-react-loader',
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
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html.ejs',
    }),
    new webpack.HotModuleReplacementPlugin(),
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

const prodConfig = {
  entry: {
    app: [
      'babel-polyfill',
      './src/index.js',
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/',
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
        loader: 'svg-react-loader',
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
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_');
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html.ejs',
    }),

    new NameAllModulesPlugin(),
  ],
};

if (process.env.NODE_ENV === 'production') {
  config = prodConfig;
} else {
  config = devConfig;
}
module.exports = config;
