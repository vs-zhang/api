const merge = require('webpack-merge');
const baseConfig = require('../base.config.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(baseConfig, {
    devtool: 'cheap-module-source-map',
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
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    plugins: [
        new Dotenv({
            path: './env/.env.local'
        })
    ]
});
