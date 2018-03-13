const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        app: './src/index.js',
        lib: './src/fontawesome-all.min.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, 'src/fontawesome-all.min.js')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env', "babel-preset-react"],
                        plugins: ["transform-object-rest-spread", "transform-async-to-generator"]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            title: 'React Redux Spotify Client',
            template: 'src/index.html'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: 'lib.bundle.js'
        })
    ] 
}