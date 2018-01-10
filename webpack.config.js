const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'public', 'app'),
  entry: {
      app: './App.js',
      dashboard: './components/dashboard/Dashboard.js'
  },
  output:{
      filename: 'public/build/[name].bundle.js',
      sourceMapFilename: 'public/build/[name].bundle.map'
  },
  devtool: 'source-map',
  module: {
   loaders: [
     {
       test: /\.jsx?$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader',
       query:{
           presets: ['react','es2015'],
           plugins: ['transform-object-rest-spread']
       }
     },
     {
       test: /\.css$/,
       loader: ExtractTextPlugin.extract({
         fallback: "style-loader",
         use: "css-loader"
       })
     }
   ]
  },
  plugins: [
    new ExtractTextPlugin("./public/stylesheets/component_styles.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      test: /\.js($|\?)/i,
      cache: true
    })
  ]
}﻿