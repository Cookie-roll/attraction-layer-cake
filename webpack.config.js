const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const translationsFallback = require('./src/translations/en');
const dotenv = require('dotenv');

dotenv.config({path: '.env'});

const getPort = function (port) {
    port = parseInt(port, 10);
    if ([0, 80, 443].includes(port)) {
        return '';
    }

    return ':' + port;
};

const baseUrl = `${process.env.SCHEME}://${process.env.DOMAIN}${getPort(process.env.PORT)}`;

Encore
    .setOutputPath('build/')
    .setPublicPath('/')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .addEntry('app', './src/app.js')
    .enableSassLoader()
    .enablePostCssLoader()
    .enableVueLoader()
    .disableSingleRuntimeChunk()
    .addPlugin(new HtmlWebpackPlugin({
        template: './src/index.ejs',
        templateParameters: {
            'title': translationsFallback['title'],
            'description': translationsFallback['description'],
            'keywords': translationsFallback['keywords'],
            'baseUrl': `${baseUrl}`,
            'banner': `${baseUrl}/banner.png`,
        },
        favicon: './src/images/favicon.png',
    }))
    .addPlugin(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'baseUrl': JSON.stringify(`${baseUrl}`),
    }))
    .addPlugin(new CopyWebpackPlugin([
        { from: './src/images/banner.png', to: 'banner.png' }
    ]))
;

module.exports = Encore.getWebpackConfig();
