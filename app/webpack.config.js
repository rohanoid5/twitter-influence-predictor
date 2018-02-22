const path = require('path');
const {LoaderOptionsPlugin, optimize, DefinePlugin, HotModuleReplacementPlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const SWPrecacheWebpackDevPlugin = require('sw-precache-webpack-dev-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ({prod = false, sw = false, prefix = ''} = {}) => {
	const makemode = process.argv[1].includes('webpack-dev-server') ? 'serve' : 'build';

	process.env.NODE_ENV = prod ? 'production' : 'development';

	const serviceWorkerConfig = {
		cacheId: require('./package.json').name,
		staticFileGlobs: [
	        'build/**.*',
	      ],
	     stripPrefix: 'build/',
		maximumFileSizeToCacheInBytes: 4194304,
		runtimeCaching: [{
			handler: 'cacheFirst',
			urlPattern: '/**'

		}],
		minify:true,
		logger: function () {},
		filename: 'sw.js'
	};

	//serviceWorkerConfig.stripPrefixMulti[`${path.resolve(__dirname, './build')}`] = `${prefix ? '/' : ''}${prefix}`;

	const webpackConfig = {
			//devtool: 'source-map',
		entry: {
			main: ['./src/index.js'],
			vendor: ['react', 'react-dom']
		},
		output: {
			path: path.resolve(__dirname, './build'),
			pathinfo: true,
			publicPath: ``,
			filename: '[name].[hash:8].js'
		},
		module: {
			loaders: [{
				test: /\.(js|jsx)$/,
				include: path.resolve(__dirname, './src'),
				exclude:/node_modules/,
				loaders: 'babel-loader',

			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			}]
		},
		plugins: [
			new optimize.OccurrenceOrderPlugin(),
			new HtmlWebpackPlugin({
				inject: true,
				template: './public/index.html',
				favicon: './public/favicon.ico',
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					keepClosingSlash: true
				}
			}),
			new optimize.CommonsChunkPlugin('commons.chunk.js'),
			new LoaderOptionsPlugin({
				  minimize: true,
	                debug: false,
				options: {
					postcss: []
				}
			}),
			new DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
				}
			})
		],
		devServer: {
			contentBase: 'public',
			inline: true,
			host: process.env.HOST || 'localhost',
			port: Number.parseInt(process.env.PORT || 3000, 10)
		}
	};

	if (makemode === 'serve') {
		// Add plugins for serving
		webpackConfig.entry.main.unshift('webpack-dev-server/client?http://localhost:3000/');
		webpackConfig.plugins.push(new HotModuleReplacementPlugin());

		// Enable service worker while app running on dev server
		if (sw) {
			// Add service worker register script into html
			webpackConfig.entry.sw = './src/sw-register.js';

			// Add service worker precache generator
			webpackConfig.plugins.push(new SWPrecacheWebpackDevPlugin(serviceWorkerConfig));
		}
	} else if (makemode === 'build') {
		// Add service worker register script into html
		webpackConfig.entry.sw = './src/sw-register.js';

		// Add plugins for build
		webpackConfig.plugins.push(new SWPrecacheWebpackPlugin(serviceWorkerConfig));
		webpackConfig.plugins.push(new CopyWebpackPlugin([{
			context: './public',
			from: '*.png'
		}, {
			from: './public/manifest.json'
		},{
			context: './public',
			from: '*.jpg'
		}]));

		if (process.env.NODE_ENV === 'production') {
			webpackConfig.plugins.push(new optimize.UglifyJsPlugin({
				compressor: {
			        warnings: false
			      },
				compress: {
                screw_ie8: true
					},
				output: {comments: false}
			      }));
			webpackConfig.plugins.push(new optimize.AggressiveMergingPlugin());
			webpackConfig.plugins.push(new CompressionPlugin());

		}
	}

	return webpackConfig;
};
