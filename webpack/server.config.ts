import webpack, { Configuration } from 'webpack';

const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

import { DIST_DIR, SRC_DIR } from './env';

const config: Configuration = {
  mode: 'development',
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: path.resolve(SRC_DIR, 'server.ts'),
  devtool: 'source-map',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/',
  },
  resolve: {
    modules: [SRC_DIR, 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(SRC_DIR, '../tsconfig.json') })],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(SRC_DIR, '../tsconfig.json'),
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

  plugins: [ // TODO - EnvironmentPlugin и Dotenv можно выбирать в зависимости от production / development
    new webpack.EnvironmentPlugin(['REDIRECT_URI', 'FORUM_API_URL']),
    new Dotenv(),
    new WebpackBar(),
    new MiniCssExtractPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
    }),
  ]
};

export default config;
