'use strict';

let webpack = require('webpack');
let CommonChunkWebpack = webpack.optimize.CommonsChunkPlugin;
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let path = require('path');
let rootDir = path.resolve(__dirname);


const config = {
    context: rootDir,

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
                    path.resolve(rootDir, 'src')
                ],
                exclude: [/node_modules/],
                test: /\.tsx?$/,
                use: ['ts-loader', 'angular2-template-loader', 'angular-router-loader']
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
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
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: "file-loader",
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,  use: "url-loader?limit=10000&mimetype=application/font-woff&name=/css/fonts/[name].[ext]" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: "url-loader?limit=10000&mimetype=application/font-woff&name=/css/fonts/[name].[ext]" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,   use: "url-loader?limit=10000&mimetype=application/octet-stream&name=/css/fonts/[name].[ext]" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,   use: "file-loader?name=/css/fonts/[name].[ext]" }
        ]
    },

    plugins: [
        new CommonChunkWebpack({
            name: ['polyfills', 'vendor', 'app'].reverse(),
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
                drop_console: false
            },
            mangle: {
                keep_fnames: true
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.jQuery': 'jquery',
            'window.Tether': 'tether'
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(rootDir, 'src'), // location of your src
            {} // a map of your routes
        ),
        new ExtractTextPlugin({
            filename: "[name].[hash].css",
            disable: false,
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin()
    ],

    stats: {
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true
    },

    devtool: 'source-map'

};

module.exports = config;