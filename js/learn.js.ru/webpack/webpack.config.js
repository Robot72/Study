const path = require('path');

// const process.env.NODE_ENV = 'development';
const NODE_ENV = 'development';
const webpack = require('webpack');

module.exports = {
	entry: "./home", // string | object | array

	output: {
		// options related to how webpack emits results

		// path: path.resolve(__dirname, "dist"), // string
		// the target directory for all output files
		// must be an absolute path (use the Node.js path module)

		filename: "bundle.js", // string
		// the filename template for entry chunks

		// publicPath: "/assets/", // string
		// the url to the output directory resolved relative to the HTML page

		library: "home", // string,
		// the name of the exported library

		// libraryTarget: "umd", // universal module definition
		// the type of the exported library

		/* Advanced output configuration (click to show) */
	},
	watch: NODE_ENV == 'development',
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == 'development' ? 'source-map' : 'nosources-source-map',
	plugins: [
		new webpack.EnvironmentPlugin('NODE_ENV')
	],
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader'
		}]
	}

}
