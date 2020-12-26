import { Configuration, WebpackPluginInstance } from 'webpack';
import 'webpack-dev-server';
import WebpackCompression from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const isLocalBuild = /local/i.test(process.env.BUILD_ENV || '');

const compressionPlugin = new WebpackCompression({
  filename: '[path]',
  algorithm: 'gzip',
  test: /\.js(\.gz)?(\?.*)?$/,
  minRatio: 1,
  exclude: /(service-worker|sw|workbox-.*)\.js$/,
});

const ejsRegexp = /\.ejs$/;

const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: 'public',
      filter(path) {
        return !ejsRegexp.test(path);
      },
    },
  ],
});

const swPlugin = new WorkboxPlugin.GenerateSW({
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true,
});

const terser = new TerserPlugin({
  parallel: true,
  sourceMap: false,
  cache: true,
  terserOptions: { output: { comments: false }, sourceMap: false },
}) as WebpackPluginInstance;

function getPlugins(): WebpackPluginInstance[] {
  const plugins = [copyPlugin, swPlugin];
  if (!isLocalBuild) {
    plugins.push(compressionPlugin);
  }
  return plugins;
}

const prodConfig: Configuration = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [terser],
  },
  plugins: getPlugins(),
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
};

export default prodConfig;
