/**
 * Установим основные зависимости сборщика
 * npm i --save-dev webpack webpack-cli webpack-merge
 */

/**
 * Установим необходимы лоадеры и плагины
 * npm i --save-dev babel-loader css-loader vue-loader style-loader postcss-loader file-loader
 * npm i --save-dev mini-css-extract-plugin copy-webpack-plugin html-webpack-plugin
 */

/**
 * Установим  завасимости для babel
 * npm i --save-dev @babel/core @babel/preset-env
 */

/**
 * Установим плагины для postcss
 * npm i --save-dev autoprefixer css-mqpacker cssnano
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
};

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src
	},
	output: {
		filename: `${PATHS.assets}js/[name].js`,
		path: PATHS.dist,
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: { path: `${PATHS.src}/js/postcss.config.js` }
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: { path: `${PATHS.src}/js/postcss.config.js` }
						}
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true }
					}
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader'
					},
					hotReload: true
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}
		]
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.js'
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].css`
		}),
		// Copy HtmlWebpackPlugin and change index.html for another html page
		new HtmlWebpackPlugin({
			hash: false,
			template: `${PATHS.src}/index.html`,
			filename: './index.html'
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
			{ from: `${PATHS.src}/static`, to: '' }
		])
	]
};
