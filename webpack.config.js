var isDevMode = process.env.NODE_ENV != 'production';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var failPlugin = require('webpack-fail-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var focus = require('postcss-focus');


var webpackConfig = {
  cache: true,
  devtool: 'inline-source-map',
  entry: {
    'bundle': path.resolve(__dirname, 'app/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].js',
    pathInfo: true,
  },
  devServer: {
    outputPath: path.resolve(__dirname, 'dist')
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    unsafeCache: true,
    alias: {
      'react$': path.resolve(__dirname, 'node_modules/react/dist/react-with-addons.js'),
      'react-dom$': path.resolve(__dirname, 'node_modules/react-dom/dist/react-dom.js'),
      'redux$': path.resolve(__dirname, 'node_modules/redux/dist/redux.js'),
      'react-redux$': path.resolve(__dirname, 'node_modules/react-redux/dist/react-redux.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __ENV__: 'development',
      __DEV__: true
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    failPlugin
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css!postcss'),
        loader: ExtractTextPlugin.extract('css!postcss'),
        include: [
          path.resolve(__dirname, 'app')
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|eot|otf|woff)(\?.*|)$/i,
        loader: 'file',
        include: [
          path.resolve(__dirname, 'app')
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: [
            'react',
            'es2015'
          ],
          plugins: [
            'transform-object-rest-spread'
          ]
        },
        include: [
          path.resolve(__dirname, 'app')],
        exclude: [/node_modules/]
      }
    ],
    noParse: [
      /react-with-addons.js$/
    ]
  },
  postcss: function() {
    return [
      autoprefixer,
      focus,
      precss
    ];
  },
  watchOptions: {
    aggregateTimeout: 100
  }
};

if (!isDevMode) {
  webpackConfig.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __ENV__: 'production',
      __DEV__: false
    }),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        unsafe: true
      }
    })
  ];  
}

module.exports = webpackConfig;
