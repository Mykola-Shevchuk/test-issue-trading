const path = require('path');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');

const config = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: 'bundle.[hash].js',
		path: distPath
	},
	module: {
		rules: [{
			test: /\.html$/,
			use: 'html-loader'
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
				'css-loader'
			]
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	optimization: isProduction ? {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						inline: false,
						drop_console: true
					},
				},
			}),
		],
	} : {},
	devServer: {
		contentBase: distPath,
		port: 9000,
		compress: true,
		open: true
	},
	devtool: isDevelopment ? '#source-map' : false,
	stats: {
		colors: true,
		hash: true,
		timings: true,
		assets: true,
		chunks: false,
		chunkModules: false,
		modules: false,
		children: false,
	}
};

module.exports = config;
