const merge = require('webpack-merge'),
			common = require('./webpack.common.js'),
			MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
   rules: [
		 {
		 		test: /\.css$/,
		 		use: [
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
});
