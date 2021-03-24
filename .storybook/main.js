const path = require('path');
const include = path.resolve(__dirname, '../');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.modules = [path.resolve(include, 'src'), 'node_modules'];

    config.module.rules.push({
      test: /\.tsx?$/,
      use: ['babel-loader'],
      include,
    });

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include,
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include,
    });

    return config;
  },
};
