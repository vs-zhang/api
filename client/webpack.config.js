const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: ['./src/main.jsx'],
    devServer: {
        hot: false,
        inline: false,
        host: '0.0.0.0',
        publicPath: '/',
        disableHostCheck: true,
        historyApiFallback: true,
        port: 8080,
        contentBase: './src',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
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
        new HtmlWebpackPlugin({
            chunkSortMode: 'dependency',
            filename: 'index.html',
            hash: false,
            inject: 'body',
            template: './src/index.tpl.html'
        })
    ],
    bail: true
};
