/**
 * Установим зависимости для продакшен сборки
 * npm i --save-dev terser-webpack-plugin clean-webpack-plugin
 */

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
	mode: 'production',
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false
					}
				},
				cache: true,
				parallel: true
			})
		]
	},
	plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin()]
});
