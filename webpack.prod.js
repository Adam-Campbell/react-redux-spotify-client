const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{loader: 'css-loader', options: {minimize: true}}, 'sass-loader']
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new MinifyPlugin(null, {
            test: /\.js$/,
            exclude: [
                /node_modules/,
                path.resolve(__dirname, 'src/fontawesome-all.min.js')
            ]
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});