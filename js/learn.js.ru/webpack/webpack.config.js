const path = require('path');
//const process.env.NODE_ENV = 'development';
const NODE_ENV = 'development';
const webpack = require('webpack');

module.exports = {
    context: './frontend',
	entry: {
        home: './home',
        contact: './contact',
    },

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
                    options: { presets: ['es2015'] }
                }]
            }]
	}
}
