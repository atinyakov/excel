const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext) =>
    isDev ? `bundle.${ext}` : `bundle.[chunkhash].${ext}`;

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    {
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                ],
            },
        },
    ];

    if (isDev) {
        loaders.push({
            loader: 'eslint-loader',
            options: {
                fix: true,
            },
        });
    }

    return loaders;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    target: isDev ? 'web' : 'browserslist',
    devServer: {
        port: 3000,
        open: isDev,
        hot: isDev,
    },
    devtool: isDev ? 'source-map' : false,
    entry: ['@babel/polyfill', './index.js'],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
        ],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            },
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
    ],
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src', 'core'),
            '@components': path.resolve(__dirname, 'src', 'components'),
        },
    },
};
