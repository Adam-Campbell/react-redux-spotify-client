const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        fetch: 'whatwg-fetch',
        app: './src/index.js'
    },
    //entry: ['babel-polyfill', './src/index.js'],
    devServer: {
        contentBase: './dist',
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
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
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
        new ExtractTextPlugin('style.css')
    ]
}