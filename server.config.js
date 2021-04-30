const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  name: 'server',
  target: 'node',
  node: { __dirname: false },
  entry: './src/server.ts',
  devtool: 'source-map',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
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
        loader: 'null-loader',
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif|webp)$/,
        loader: 'null-loader',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },

  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new Dotenv(),
    // new CleanWebpackPlugin(),
    new WebpackBar(),
    new MiniCssExtractPlugin(),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'ru'],
    }),
  ]
};
