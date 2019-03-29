const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
      app: './public/app/App.js',
      dashboard: './public/app/components/dashboard/Dashboard.js'
  },
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist/public/build'),
      publicPath: '/dist/public/build',
      sourceMapFilename: '[name].bundle.map',
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
   ]
 	},
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: '../../../views/layout.hbs',
      template: './views/html-webpack-template.hbs'
    })
  ]
}
