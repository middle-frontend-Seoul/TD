const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const webpackEnvs = require('./env');

module.exports = {
  mode: 'development',
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.resolve(webpackEnvs.SRC_DIR, 'server.ts'),
  devtool: 'source-map',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: webpackEnvs.DIST_DIR,
    publicPath: '/',
  },
  resolve: {
    modules: [webpackEnvs.SRC_DIR, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(webpackEnvs.SRC_DIR, '../tsconfig.json') })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(webpackEnvs.SRC_DIR, '../tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        loader: 'null-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        loader: 'null-loader',
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif|webp)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 25 * 1024 // in bytes
          },
        }],
      },
      {
        test: /\.html$/i,
        loader: 'null-loader',
      },
    ],
  },

  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

  plugins: [
    new Dotenv(),
    new WebpackBar(),
    new MiniCssExtractPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
    }),
  ]
};
