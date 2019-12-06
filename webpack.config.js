/**
 * Assets Config file
 */

const localServer = {
  path: 'localhost/dist/',
  port: 3000,
};

const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;

const config = {
  entry: {
    app: './src/js/app.js',
    preload:'./src/js/preload.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: 'images/design/[name].[hash:6].[ext]', publicPath: '../', limit: 8192 },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: { name: 'fonts/[name].[hash:6].[ext]', publicPath: '../', limit: 8192 },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  plugins: [
    // new BrowserSyncPlugin({
    //   proxy: localServer.path,
    //   port: localServer.port,
    //   files: [],
    //   ghostMode: {
    //     clicks: false,
    //     location: false,
    //     forms: false,
    //     scroll: false,
    //   },
    //   injectChanges: true,
    //   logFileChanges: true,
    //   logLevel: 'debug',
    //   logPrefix: 'wepback',
    //   notify: true,
    //   reloadDelay: 0,
    // }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.ejs'),
      favicon: path.resolve(__dirname, 'src', 'images', 'favicon.ico'),
      "htmlWebpackPlugin": {
        "files": {
          "css": ["main.css"],
          "js": ["assets/head_bundle.js", "assets/main_bundle.js"],
          "chunks": {
            "head": {
              "entry": "js/preload.js",
              "css": ["css/app.css"]
            },
            "main": {
              "entry": "js/app.js",
              "css": []
            },
          }
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new ImageMinPlugin({ test: /\.(jpg|jpeg|png|gif|svg)$/i }),
    new CleanWebpackPlugin({
      /**
       * Some plugins used do not correctly save to webpack's asset list.
       * Disable automatic asset cleaning until resolved
       */
      cleanStaleWebpackAssets: false,
      // Alternative:
      // cleanAfterEveryBuildPatterns: [
      // copy-webpackPlugin:
      //   '!images/content/**/*',
      // url-loader fonts:
      //   '!**/*.+(eot|svg|ttf|woff|woff2)',
      // url-loader images:
      //   '!**/*.+(jpg|jpeg|png|gif|svg)',
      // ],
      verbose: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', 'images', 'content'),
        to: path.resolve(__dirname, 'dist', 'images', 'content'),
        toType: 'dir',
      },
      {
        from: path.resolve(__dirname, 'src', 'js', 'lib'),
        to: path.resolve(__dirname, 'dist', 'js', 'lib'),
        toType: 'dir',
      },

    ]),
  ],
  devtool: 'inline-source-map',
  devServer: {
        contentBase: './dist',
        hot: true,
},
};

module.exports = config;
