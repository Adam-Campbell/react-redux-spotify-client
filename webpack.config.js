const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');


module.exports = {
    entry: {
        app: './src/index.js',
        lib: './src/fontawesome-all.min.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     //use: [{loader: 'css-loader', options: {minimize: true}}, 'sass-loader']
                //     use: ['style-loader', 'css-loader', 'sass-loader']
                // })
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
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
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
    // plugins: [
    //     new ExtractTextPlugin('style.css')
    //     // new MinifyPlugin(null, {
    //     //     test: /\.js$/,
    //     //     exclude: /node_modules/
    //     // })
    // ]
}






// {
//     test: /\.scss$/,
//     use: ExtractTextPlugin.extract({
//         use: ['css-loader', 'sass-loader']
//     })
// },