'use strict';

//const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
      new BrowserSyncPlugin({
        notify: false,
        host: 'localhost',
        port: 3000,
        logLevel: 'silent',
        files: [
          "./source/wp-content/themes/**/*.css",
          "./source/wp-content/themes/**/*.php",
          "./source/wp-content/themes/**/**/*.php",
          "./source/wp-content/themes/**/*.js",
        ],
        proxy: 'http://localhost:9009/',
      }),
  ].filter(Boolean),
};
