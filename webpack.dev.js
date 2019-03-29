const merge = require('webpack-merge'),
			common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist/public/build'
  },
  module: {
   rules: [
     {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
     }
   ]
  }
});