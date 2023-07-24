const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'To do list',
      template: 'src/template.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: './dist',
  },
  devtool: 'inline-source-map',
}