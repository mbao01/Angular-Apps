'use strict';

let webpack = require('webpack');
let path = require('path');
let rootDir = path.resolve(__dirname);
let helpers = require('./helpers');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',

    entry: {
        app: [ path.resolve(rootDir, './src', 'client/boot') ],
        vendor: [ path.resolve(rootDir, './src', 'client/config/vendor') ],
        polyfills: [ path.resolve(rootDir, './src', 'client/config/polyfills') ]
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                include: [
                    path.resolve(rootDir, "src")
                ],
                exclude: [/node_modules/],
                test: /\.tsx?$/,
                use: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [/node_modules/, /\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.css$/,
                use: 'css-loader',
                exclude: [/node_modules/, /\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.scss$/,
                loader: [
                    ExtractTextPlugin.extract({
                        fallbackLoader: 'style-loader',
                        loader: ['css-loader']
                    }),
                    'to-string-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: [/node_modules/, /\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: "file-loader",
                exclude: [/node_modules/, /\.(spec|e2e)\.ts$/],
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: "[name].[hash].css",
            disable: false,
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            tether: 'tether',
            Tether: 'tether',
            'window.jQuery': 'jquery',
            'window.Tether': 'tether'
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        )
    ]
};