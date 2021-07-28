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
          "./source/wp-content/plugins/**/*.js",
          "./source/wp-content/plugins/**/*.php",
          "./source/wp-content/plugins/**/*.css",
        ],
        proxy: 'http://localhost:8000/',
      }),
  ].filter(Boolean),
};
