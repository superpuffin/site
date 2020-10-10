var path = require('path');

module.exports = {
  mode: 'production',
  entry: './_src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
      rules: [
          {
              test: new RegExp('\.m?js$'),
              exclude: new RegExp('(node_modules|bower_components)'),
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                  }
              }
          }
      ]
  },
  resolve: {
      alias: {
         'jquery': 'jquery/dist/jquery.slim'
      }
  }
};