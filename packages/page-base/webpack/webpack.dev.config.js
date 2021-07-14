const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = webpackConfig({
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?name=mobile&reload=true',
        path.join(__dirname, '../src/app.tsx')
    ],
    output: {
        filename: `[name]_checkhash.js`,
        chunkFilename: `[name].chunk.js`,
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, '../index.html')
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/, // exclude node_modules
            failOnError: false // show a warning when there is a circular dependency
        })
    ],
    devtool: 'cheap-module-eval-source-map',
    performance: {
        hints: false
    }
})
