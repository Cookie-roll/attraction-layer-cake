const Encore = require('@symfony/webpack-encore');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const translationsFallback = require('./src/translations/en');
const dotenv = require('dotenv');
const { attractionTypes, relationshipTypes, orientationTypes } = require('./src/options');

dotenv.config({path: '.env'});

const getPort = function (port) {
    port = parseInt(port, 10);
    if ([0, 80, 443].includes(port)) {
        return '';
    }

    return ':' + port;
};

const baseUrl = `${process.env.SCHEME}://${process.env.DOMAIN}${getPort(process.env.PORT)}`;

const banners = [];

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
        { from: './src/images/banner.png', to: 'banner.png' },
        { from: './src/images/banners/*', to: '[name].[ext]' },
        { from: './src/arc-sw.js', to: 'arc-sw.js' },
    ]))
;

for (let attraction of attractionTypes.types) {
    for (let relationship of relationshipTypes.types) {
        for (let orientation of orientationTypes.types) {
            const code = `${attraction.code}${relationship.code}${orientation.code}`;
            Encore.addPlugin(new HtmlWebpackPlugin({
                template: './src/index.ejs',
                filename: `${code}.html`,
                templateParameters: {
                    'title': code + ' • ' + translationsFallback['title'],
                    'description': translationsFallback['description'],
                    'keywords': translationsFallback['keywords'],
                    'baseUrl': `${baseUrl}/${code}`,
                    'banner': `${baseUrl}/${code}.jpg`,
                },
                favicon: './src/images/favicon.png',
            }))
        }
    }
}

module.exports = Encore.getWebpackConfig();
