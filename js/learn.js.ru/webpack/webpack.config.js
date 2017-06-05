const path = require('path');
//const process.env.NODE_ENV = 'development';
const NODE_ENV = 'development';
const webpack = require('webpack');

module.exports = {
	entry: "./home",

	output: {
		filename: "bundle.js",
		library: "./home",
	},
	watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == 'development' ? 'source-map' : 'nosources-source-map',
	plugins: [
		new webpack.EnvironmentPlugin('NODE_ENV'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }/*,
            output: {
                comments: false,
            },*/
        })
	],
	module: {
		rules: [{
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }]
            }]
	}
}
