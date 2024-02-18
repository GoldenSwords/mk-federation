const { merge } = require('webpack-merge');

module.exports = (config) =>
  merge(
    /** @type {import('webpack').Configuration} */
    {
      mode: 'development',
      target: 'web',
      devtool: 'eval-source-map',
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      optimization: {
        minimize: true,
      },
      performance: {
        hints: false,
        maxEntrypointSize: 512_000,
        maxAssetSize: 512_000,
      },
      module: {
        rules: [
          {
            test: /\.svg/,
            type: 'asset/resource',
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.scss$/i,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
          },
          {
            test: /\.(tsx|ts)?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
    },
    config,
  );
