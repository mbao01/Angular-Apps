'use strict';

let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./webpack.common.js');
let helpers = require('./helpers');
let HtmlWebpack = require('html-webpack-plugin');
let path = require('path');
let rootDir = path.resolve(__dirname);

const ENV = 'development';

try {
    let m = require('./src/client/config/env/config.js')(ENV);
} catch (e) {}

const METADATA = webpackMerge(commonConfig.metadata, m || { ENV: ENV });

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path:path.resolve(rootDir, 'public'),
        publicPath: '',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js',
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpack({
            filename: 'index.html',
            inject: 'body',
            template: path.resolve(rootDir, 'src', 'client/views/root.html')
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(METADATA)
        })
    ],

    watch:  true,

    devServer: {
        proxy: {
            '/test': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
});