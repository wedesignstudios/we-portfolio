const path = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: {
      app: './public/app/App.js',
      dashboard: './public/app/components/dashboard/Dashboard.js'
  },
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist/public/build'),
      publicPath: '/',
      sourceMapFilename: '[name].bundle.map',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist/public/build'
  },
  module: {
   rules: [
     {
        test: /\.(js|jsx)$/,
        exclude: /( node_modules | bower_components )/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
     },
     {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' :
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                publicPath: './public/stylesheets/component_styles.css'
              }
            },
          'css-loader'
        ]
     }
   ]
  },
  plugins: [
    new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css'
        })
  ]
}﻿
