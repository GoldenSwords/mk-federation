// @ts-expect-error 忽略全局变量
// @ts-nocheck
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MKFederationPlugin = require('../../plugins/federation');
const config = require('../../plugins/webpack.dev');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const v = require('./package.json');
// @ts-check

/** @type {import('webpack').Configuration} */
module.exports = config({
  entry: './src/bootstrap',
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html') }),
    new MKFederationPlugin({
      name: 'view',
      remotes: { frame: 'frame@http://localhost:8080/remoteEntry.js' },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './worker/'),
          to: path.resolve(__dirname, `../../dist/modules/${v.version}/component`),
        },
      ],
    }),
  ],
  output: { path: path.resolve(__dirname, `../../dist/modules/${v.version}/component`), publicPath: '/' },
  devServer: {
    port: 4002,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});
