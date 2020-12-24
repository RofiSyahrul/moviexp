import * as webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { config } from 'dotenv';
import { alias, dist, entry, env, root, src } from '../.paths';
import { keywords } from '../package.json';
import { theme_color, name, description } from '../public/manifest.json';

config({ path: env });

const viewport =
  'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';

const title = 'Explore movies';
const favicon = './public/rho-pi.ico';
const url = 'https://moviexp-rofi.netlify.app';
const ogImage =
  'https://avatars1.githubusercontent.com/u/44445726?s=460&u=7226c3b6d6e2d2163dd0eab652c20aaba6775755&v=4';

const htmlPlugin = new HtmlWebpackPlugin({
  title,
  favicon,
  template: './public/index.ejs',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
  },
  meta: {
    viewport,
    description,
    author: 'Rofi',
    image: ogImage,
    keywords: `${keywords.join(', ')}, ${title}`,
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': name,
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-touch-icon': '/rho-pi.ico',
    'application-name': name,
    'theme-color': theme_color,
    'msapplication-TileColor': theme_color,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': ogImage,
    'twitter:creator': '@RofiSyahrul',
    'twitter:dnt': 'on',
    'twitter:card': 'summary_large_image',
  },
  templateParameters: {
    description,
    title,
    url,
    ogImage,
    favicon: '/rho-pi.ico',
    themeColor: theme_color,
  },
});

const constants = Object.keys(process.env).reduce((obj, key) => {
  obj[key] = JSON.stringify(process.env[key]);
  return obj;
}, {});

const commonConfig: webpack.Configuration = {
  entry,
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true, context: root },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [['react-app', { flow: false, typescript: true }]],
            },
          },
        ],
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'media/images/[ext]/[name].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          prefix: 'fonts',
          name: 'media/fonts/[name].[ext]',
          esModule: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [src, 'node_modules'],
    alias,
  },
  plugins: [
    new CleanWebpackPlugin(),
    htmlPlugin,
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      ...constants,
    }),
    new PreloadWebpackPlugin({ rel: 'preload', include: 'initial' }),
    new ESLintPlugin(),
  ],
  output: {
    path: dist,
    publicPath: '/',
    filename: 'js/app.js',
    chunkFilename: 'js/[name]-[hash].js',
  },
};

export default commonConfig;
