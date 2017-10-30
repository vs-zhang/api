const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: ['./src/main.jsx'],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: [
                    /node_modules/
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader?limit=8192&name=images/[name]-[hash:6].[ext]'
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: './.env.local'
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new HtmlWebpackPlugin({
            chunkSortMode: 'dependency',
            filename: 'index.html',
            hash: false,
            favicon: './src/assets/favicon.ico',
            inject: 'body',
            template: './src/index.tpl.html'
        })
    ]
};
