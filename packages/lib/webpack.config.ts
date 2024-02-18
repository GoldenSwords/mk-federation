// @ts-expect-error 忽略全局变量
// @ts-nocheck
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MKFederationPlugin = require('../../plugins/federation');
const config = require('../../plugins/webpack.dev');
const path = require('path');
const v = require('./package.json');
// @ts-check

/** @type {import('webpack').Configuration} */
module.exports = config({
  entry: './src/bootstrap',
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, './index.html') }),
    new MKFederationPlugin({
      name: 'lib',
      exposes: {
        './Test': './src/components/Test/index',
        './Button': './src/components/Button/index',
        './Context': './src/components/Context/index',
        './math': './src/helper/math',
      },
      remotes: { component: 'component@http://localhost:4001/remoteEntry.js' },
    }),
  ],
  output: { path: path.resolve(__dirname, `../../dist/modules/${v.version}/lib`) },
  devServer: {
    port: 4000,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});
