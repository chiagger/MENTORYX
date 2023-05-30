const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  entry: {
    index: './src/View/landingpage/index.js',
    registration: './src/View/registration/registration.js',
    auth: './src/View/auth/auth.js',
    registrationPresenter: './src/Presenter/AuthenticationPresenter/UserRegistrationPresenter.js',
    authenticationPresenter: './src/Presenter/AuthenticationPresenter/UserAuthenticationPresenter.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MENTORYX',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({  
      filename: 'registration.html',
      title: 'Sign up',
      chunks: ['registration', 'registrationPresenter'],
    }),
    new HtmlWebpackPlugin({  
      filename: 'auth.html',
      title: 'Log in',
      chunks: ['auth', 'authenticationPresenter'], 
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
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};