const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const webpackEnvs = require('./env');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(webpackEnvs.SRC_DIR, 'client.tsx'),
    sw: path.resolve(webpackEnvs.SRC_DIR, '../sw.ts'),
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(webpackEnvs.DIST_DIR),
    publicPath: '/',
    filename: '[name].js',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [path.resolve(webpackEnvs.SRC_DIR, 'vars.scss')],
            },
          },
        ],
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
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new Dotenv(),
    // new CleanWebpackPlugin(),
    new WebpackBar(),
    new MiniCssExtractPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
    }),
  ]
};
