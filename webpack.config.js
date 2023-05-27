const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: './src/landingpage/index.js',
    auth: './src/auth/auth.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MENTORYX',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({  
      filename: 'auth.html',
      title: 'Log in',
      chunks: ['auth'], //chunks select the js file to include in the script
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};