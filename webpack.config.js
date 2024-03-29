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
    commonEvents: './src/Presenter/EventsPresenter/commonEvents.js',
    inserisciAbbonamento: './src/View/registration/inserisciAbbonamento.js',
    inserisciAbbonamentoPresenter: './src/Presenter/AuthenticationPresenter/inserisciAbbonamentoPresenter.js',
    profiloAscoltatore: './src/View/profiloAscoltatore/profiloAscoltatore.js',
    profiloAscoltatorePresenter: './src/Presenter/EventsPresenter/profiloAscoltatoreEventsPresenter.js',
    chatListStudente: './src/View/chatList/chatListStudente.js',
    chatListStudenteEventsPresenter: './src/Presenter/EventsPresenter/chatListStudenteEventsPresenter.js',
    chatListAscoltatore: './src/View/chatList/chatListAscoltatore.js',
    chatListAscoltatoreEventsPresenter: './src/Presenter/EventsPresenter/chatListAscoltatoreEventsPresenter.js',
    saldoAscoltatore: './src/View/saldoAscoltatore/saldoAscoltatore.js',
    recensione: './src/View/homeStudente/recensione.js',
    recensioneEventsPresenter: './src/Presenter/EventsPresenter/recensioneEventsPresenter.js',
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
      chunks: ['homeStudente', 'studentEventsPresenter', 'commonEvents'],
    }),
    new HtmlWebpackPlugin({
      filename: 'homeAscoltatore.html',
      title: 'Home',
      chunks: ['homeAscoltatore', 'ascoltatoreEventsPresenter', 'commonEvents'],
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
      filename: 'inserisciAbbonamento.html',
      title: 'Sign Up',
      chunks: ['inserisciAbbonamento', 'inserisciAbbonamentoPresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'impostazioni.html',
      title: 'Settings',
      chunks: ['impostazioni', 'impostazioniPresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'homeAdmin.html',
      title: 'Home',
      chunks: ['homeAdmin', 'adminEventsPresenter', 'commonEvents'],
    }),
    new HtmlWebpackPlugin({
      filename: 'profiloAscoltatore.html',
      title: 'Home',
      chunks: ['profiloAscoltatore', 'profiloAscoltatorePresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'chatListStudente.html',
      title: 'Chat',
      chunks: ['chatListStudente', 'chatListStudenteEventsPresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'chatListAscoltatore.html',
      title: 'Chat',
      chunks: ['chatListAscoltatore', 'chatListAscoltatoreEventsPresenter'],
    }),
    new HtmlWebpackPlugin({
      title: 'MENTORYX',
      filename: 'saldoAscoltatore.html',
      chunks: ['saldoAscoltatore', 'ascoltatoreEventsPresenter'],
    }),
    new HtmlWebpackPlugin({
      filename: 'recensione.html',
      title: 'Scrivi Recensione',
      chunks: ['recensione', 'studentEventsPresenter', 'recensioneEventsPresenter'],
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