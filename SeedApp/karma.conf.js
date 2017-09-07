'use strict';

module.exports = (config) => {
    config.set({
        basePath: '',
        autoWatch: true,
        browsers: ['Chrome', 'PhantomJS'],
        files: [
            {pattern: 'karma.entry.js', watched: false}
        ],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        phantomJsLauncher: {
            exitOnResourceError: true
        },
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots', 'coverage'],
        singleRun: false,
        webpack: require('./webpack.test'),
        webpackServer: {
            noInfo: true
        }
    });
};