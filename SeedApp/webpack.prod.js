'use strict';

let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./webpack.common.js');
let helpers = require('./helpers');
let CompressionPlugin = require("compression-webpack-plugin");
let HtmlWebpack = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');
let rootDir = path.resolve(__dirname);

const ENV = 'production';

try {
    let m = require('./src/client/config/env/config.js')(ENV);
} catch (e) {}

const METADATA = webpackMerge(commonConfig.metadata, m ||
    { ENV: ENV } );

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('public'),
        publicPath: '',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    performance: {
        hints: "warning",
        maxAssetSize: 600000, // int (in bytes),
        maxEntrypointSize: 5000000, // int (in bytes)
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
        }
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(rootDir, 'src/client/statics/'),
                to: path.resolve(rootDir, 'public/')
            }
        ],{
            ignore: [
                '*.txt',
                path.resolve(rootDir, 'src/client/views/root.html')

            ],

            copyUnmodified: true
        }),
        new CompressionPlugin({
            asset: "[file].gz[query]",
            algorithm: "gzip",
            test: /\.js$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: true
        }),
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(rootDir, 'src', 'client/templates/root.html')
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(METADATA),
            'br': JSON.stringify(METADATA)
        })
    ]
});