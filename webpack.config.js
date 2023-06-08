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
    homeStudente: './src/View/homeStudente/homeStudente.js',
    homeAscoltatore: './src/View/homeAscoltatore/homeAscoltatore.js',
    studentEventsPresenter: './src/Presenter/EventsPresenter/studentEventsPresenter.js',
    inserisciMetodoPagamento: './src/View/registration/inserisciMetodoPagamento.js',
    inserisciTitoloAscoltatore: './src/View/registration/inserisciTitoloAscoltatore.js',
    inserisciMetodoPagamentoPresenter: './src/Presenter/AuthenticationPresenter/inserisciMetodoPagamentoPresenter.js',
    inserisciTitoloAscoltatorePresenter: './src/Presenter/AuthenticationPresenter/inserisciTitoloAscoltatorePresenter.js',
    TitoloStudio: './src/Model/TitoloStudio.js',
    MetodoPagamento: './src/Model/MetodoPagamento.js',
    ascoltatoreEventsPresenter: './src/Presenter/EventsPresenter/ascoltatoreEventsPresenter.js',
    impostazioni: './src/View/impostazioni/impostazioni.js',
    impostazioniPresenter: './src/Presenter/EventsPresenter/impostazioniEventsPresenter',
    homeAdmin: './src/View/homeAdmin/homeAdmin.js',
    adminEventsPresenter: './src/Presenter/EventsPresenter/adminEventsPresenter.js',
    logPresenter: './src/Presenter/LogPresenter/LogPresenter.js',
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
    }),
    new HtmlWebpackPlugin({
      filename: 'homeStudente.html',
      title: 'Home',
      chunks: ['homeStudente', 'studentEventsPresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'homeAscoltatore.html',
      title: 'Home',
      chunks: ['homeAscoltatore', 'ascoltatoreEventsPresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'viewInserisciMetodoPagamento.html',
      title: 'Sign Up',
      chunks: ['inserisciMetodoPagamento', 'inserisciMetodoPagamentoPresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'viewInserisciTitoloAscoltatore.html',
      title: 'Sign Up',
      chunks: ['inserisciTitoloAscoltatore', 'inserisciTitoloAscoltatorePresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'impostazioni.html',
      title: 'Settings',
      chunks: ['impostazioni', 'impostazioniPresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'homeAdmin.html',
      title: 'Home',
      chunks: ['homeAdmin', 'adminEventsPresenter'],
    }),
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
        use: ['file-loader?name=img/[name].[ext]']
        /*[
         {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],*/

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