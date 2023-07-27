const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @type {import('webpack').Configuration}
 */
const clientConfig = {
  name: 'client',
  entry: fs
    .readdirSync(path.resolve(__dirname, './src/pages'), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.name.endsWith('.js'))
    .map((dirent) => `./src/pages/${dirent.name}`)
    .reduce((acc, cur) => {
      const name = cur.match(/\/(\w+)\.js$/)[1];
      acc[name] = cur;
      return acc;
    }, {}),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'pages/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'app.html',
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      React: 'ToyReact',
    }),
  ],
};

/**
 * @type {import('webpack').Configuration}
 */
const generateConfig = {
  name: 'generate',
  entry: ['./src/generate.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'generate.bundle.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      React: 'ToyReact',
    }),
  ],
};

module.exports = [clientConfig, generateConfig];
