const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
};

module.exports = config;
