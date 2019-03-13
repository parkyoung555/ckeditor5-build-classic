/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const UglifyJsWebpackPlugin = require( 'uglifyjs-webpack-plugin' );

module.exports = {
	devtool: 'source-map',
	performance: { hints: false },

	entry: path.resolve( __dirname, 'src', 'ckeditor.js' ),

	output: {
		// The name under which the editor will be exported.
		library: 'ClassicEditor',

		path: path.resolve( __dirname, 'build' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	optimization: {
		minimizer: [
			new UglifyJsWebpackPlugin( {
				sourceMap: true,
				uglifyOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				}
			} )
		]
	},

	plugins: [
		new CKEditorWebpackPlugin( {
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en',
			additionalLanguages: 'all'
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} ),
		new webpack.NormalModuleReplacementPlugin(
			/bold\.svg/,
			require.resolve( './icons/bold.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/bulletedlist\.svg/,
			require.resolve( './icons/bulletedlist.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/pencil\.svg/,
			require.resolve( './icons/edit.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/image\.svg/,
			require.resolve( './icons/image.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/italic\.svg/,
			require.resolve( './icons/italic.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/link\.svg/,
			require.resolve( './icons/link.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/media\.svg/,
			require.resolve( './icons/media.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/numberedlist\.svg/,
			require.resolve( './icons/numberedlist.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/quote\.svg/,
			require.resolve( './icons/quote.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/redo\.svg/,
			require.resolve( './icons/redo.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/table\.svg/,
			require.resolve( './icons/table.svg' )
		),
		new webpack.NormalModuleReplacementPlugin(
			/undo\.svg/,
			require.resolve( './icons/undo.svg' )
		)
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							singleton: true
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig( {
							themeImporter: {
								themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
							},
							minify: true
						} )
					},
				]
			}
		]
	}
};
