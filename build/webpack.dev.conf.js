/**
 * Установим зависимости для дев и продакшен сборок
 * npm i --save-dev webpack-merge
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: baseWebpackConfig.externals.paths.dist,
		port: 8081,
		compress: true,
		historyApiFallback: true,
		noInfo: true,
		open: true,
		overlay: {
			warnings: true,
			errors: true
		}
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		})
	]
});
