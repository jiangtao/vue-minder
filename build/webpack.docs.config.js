var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
		entry: {
				main: './examples/main',
				vendors: ['vue', 'vue-router']
		},
		output: {
				path: path.join(__dirname, '../docs'),
				publicPath: '',
				filename: 'js/[name].js?v=[hash:7]',
				chunkFilename: 'js/[name].chunk.js'
		},
		externals: {
				vue: {
						root: 'Vue',
						commonjs: 'vue',
						commonjs2: 'vue',
						amd: 'vue'
				}
		},
		resolve: {
				// require时省略的扩展名，如：require('module') 不需要module.js
				extensions: ['', '.js', '.vue'],
				alias: {
						hexui: path.join(__dirname, '../src/index.js')
				}
		},
		module: {
				loaders: [{
						test: /\.vue$/,
						loader: 'vue'
				}, {
						test: /\.js$/,
						loader: 'babel',
						exclude: /node_modules/
				}, {
						test: /\.css$/,
						loader: 'style!css!autoprefixer'
				}, {
						test: /\.less$/,
						loader: 'style!css!less'
				}, {
						test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
						loader: 'url?limit=8192'
				}, {
						test: /\.(html|tpl)$/,
						loader: 'vue-html'
				}]
		},
		plugins: [
				new webpack.DefinePlugin({
						'process.env': {
								NODE_ENV: '"production"'
						}
				}),
				new webpack.optimize.UglifyJsPlugin({
						compress: {
								warnings: false
						}
				}),
				new webpack.optimize.OccurenceOrderPlugin(),
				new HtmlWebpackPlugin({
						title: 'Hex UI Components Library'
				})
		]
};
