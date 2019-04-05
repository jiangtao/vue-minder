/**
 * 本地预览
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
		// 入口
		entry: {
				main: './examples/main',
				vendors: ['vue', 'vue-router']
		},
		// 输出
		output: {
				path: path.join(__dirname, '../docs'),
				publicPath: '',
				filename: 'js/[name].js',
				chunkFilename: 'js/[name].chunk.js'
		},
		// 加载器
		module: {
				loaders: [
						{test: /\.vue$/, loader: 'vue'},
						{test: /\.js$/, loader: 'babel', exclude: /node_modules/},
						{test: /\.js$/, loader: 'babel', include: /vue/},
						{test: /\.css$/, loader: 'style!css!autoprefixer'},
						{test: /\.less$/, loader: 'style!css!less'},
						{test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
						{test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192'},
						{test: /\.(html|tpl)$/, loader: 'html-loader'}
				]
		},
		vue: {
				loaders: {
						css: ExtractTextPlugin.extract(
							'style-loader',
							'css-loader?sourceMap',
							{
									publicPath: '/examples/docs'
							}
						),
						less: ExtractTextPlugin.extract(
							'vue-style-loader',
							'css-loader!less-loader',
							{
									publicPath: '/examples/docs'
							}
						),
						js: 'babel'
				}
		},
		resolve: {
				// require时省略的扩展名，如：require('module') 不需要module.js
				extensions: ['', '.js', '.vue'],
				alias: {
						minder: '../../src/index'
				}
		},
		plugins: [
				new ExtractTextPlugin('css/[name].css', {allChunks: true, resolve: ['modules']}),             // 提取CSS
				new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
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
						title: 'Vue Minder based on kityminder-core',
						prod: true,
						template: 'examples/docs.html'
				}),
		]
};


// var path = require('path');
// var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
//
// module.exports = {
// 		entry: {
// 				main: './examples/main',
// 				vendors: ['vue', 'vue-router']
// 		},
// 		output: {
// 				path: path.join(__dirname, '../docs'),
// 				publicPath: '',
// 				filename: 'js/[name].js?v=[hash:7]',
// 				chunkFilename: 'js/[name].chunk.js'
// 		},
// 		externals: {
// 				vue: {
// 						root: 'Vue',
// 						commonjs: 'vue',
// 						commonjs2: 'vue',
// 						amd: 'vue'
// 				}
// 		},
// 		resolve: {
// 				// require时省略的扩展名，如：require('module') 不需要module.js
// 				extensions: ['', '.js', '.vue'],
// 				alias: {
// 						minder: path.join(__dirname, '../src/index.js')
// 				}
// 		},
// 		module: {
// 				loaders: [{
// 						test: /\.vue$/,
// 						loader: 'vue'
// 				}, {
// 						test: /\.js$/,
// 						loader: 'babel',
// 						exclude: /node_modules/
// 				}, {
// 						test: /\.css$/,
// 						loader: 'style!css!autoprefixer'
// 				}, {
// 						test: /\.less$/,
// 						loader: 'style!css!less'
// 				}, {
// 						test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
// 						loader: 'url?limit=8192'
// 				}, {
// 						test: /\.(html|tpl)$/,
// 						loader: 'vue-html'
// 				}]
// 		},
// 		plugins: [
// 				new webpack.DefinePlugin({
// 						'process.env': {
// 								NODE_ENV: '"production"'
// 						}
// 				}),
// 				new webpack.optimize.OccurenceOrderPlugin(),
// 				new HtmlWebpackPlugin({
// 						title: 'Vue Minder based on kityminder-core',
// 						prod: true
// 				}),
// 				new HtmlWebpackIncludeAssetsPlugin({
// 						assets: [
// 								'https://unpkg.com/vue@1.0.28/dist/vue.min.js'
// 						],
// 						append: false
// 				})// 提取第三方库
// 		]
// };
// if(process.env.DEV_ENV !== 'local') {
// 		module.exports.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
// 				compress: {
// 						warnings: false
// 				}
// 		}));
// }
