/**
 * 本地预览
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
		// 入口
		entry: {
				main: './examples/main',
				vendors: ['vue', 'vue-router']
		},
		// 输出
		output: {
				path: path.join(__dirname, '../examples/docs'),
				publicPath: '/examples/docs',
				filename: '[name].js',
				chunkFilename: '[name].chunk.js'
		},
		// 加载器
		module: {
				loaders: [
						{ test: /\.vue$/, loader: 'vue' },
						{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
						{ test: /\.js$/, loader: 'babel', include: /vue/ },
						{ test: /\.css$/, loader: 'style!css!autoprefixer'},
						{ test: /\.less$/, loader: 'style!css!less' },
						{ test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
						{ test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=8192'},
						{ test: /\.(html|tpl)$/, loader: 'html-loader' }
				]
		},
		vue: {
				loaders: {
						css: ExtractTextPlugin.extract(
							"style-loader",
							"css-loader?sourceMap",
							{
									publicPath: "/examples/docs"
							}
						),
						less: ExtractTextPlugin.extract(
							'vue-style-loader',
							'css-loader!less-loader',
							{
									publicPath: "/examples/docs"
							}
						),
						js: 'babel'
				}
		},
		resolve: {
				// require时省略的扩展名，如：require('module') 不需要module.js
				extensions: ['', '.js', '.vue'],
				alias: {
						hexui: '../../src/index'
				}
		},
		plugins: [
				new ExtractTextPlugin("[name].css",{ allChunks : true,resolve : ['modules'] }),             // 提取CSS
				new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),                           // 提取第三方库
		]
};
