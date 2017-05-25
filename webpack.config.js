const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
      app: './public/app/App.js',
      dashboard: './public/app/components/Dashboard.js'
  },
  output:{
      filename: 'public/build/[name].bundle.js',
      sourceMapFilename: 'public/build/[name].bundle.map'
  },
  devtool: '#source-map',
  module: {
   loaders: [
     {
       test: /\.jsx?$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader',
       query:{
           presets: ['react','es2015']
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
  ]
}﻿