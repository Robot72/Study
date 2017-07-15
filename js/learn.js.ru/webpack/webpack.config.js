const path = require('path');
//const process.env.NODE_ENV = 'development';
const NODE_ENV = 'development';
const webpack = require('webpack');

module.exports = {
	context: __dirname + '/frontend',
	entry: {
		app: './app',
	},
	output: {
		path: __dirname + '/public',
		filename: "[name].js",
    publicPath: '/'
	},
	watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},
	// devtool: NODE_ENV == 'development' ? 'source-map' : 'nosources-source-map',
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.EnvironmentPlugin('NODE_ENV'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		/*new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false,
		        drop_console: false,
		    }
		}),*/
	],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: [/node_modules/],
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}]
		}]
	},
	stats: 'normal',
  externals: {
    lodash: '_'
  }
}
