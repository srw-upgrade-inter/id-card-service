/* This config file is only for transpiling the Express server file.
 * You need webpack-node-externals to transpile an express file
 * but if you use it on your regular React bundle, then all the
 * node modules your app needs to function get stripped out.
 *
 * Note: that prod and dev mode are set in npm scripts.
 */
const path = require('path');
// const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');
const SERVER_PATH = './src/server.js';
module.exports = {
	mode: 'production',
	entry: {
		server: SERVER_PATH,
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js',
	},
	target: 'node',
	externals: [nodeExternals()], // Need this to avoid error when working with Expres
};