const webpack = require('webpack');
const path = require('path');

const dir_js = path.resolve(__dirname, 'js');
const dir_build = path.resolve(__dirname, 'build');

module.exports = {
  context: dir_js,
  entry: './Main.js',
  output: {
    path: dir_build,
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: dir_js,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    }]
  }
};
