import { Configuration, WebpackPluginInstance } from 'webpack';
import 'webpack-dev-server';
import WebpackCompression from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isLocalBuild = /local/i.test(process.env.BUILD_ENV || '');
const isAnalyze = process.env.ANALYZE === 'true';

const compressionPlugin = new WebpackCompression({
  filename: '[path]',
  algorithm: 'gzip',
  test: /\.js(\.gz)?(\?.*)?$/,
  minRatio: 1,
  exclude: /(service-worker|sw|workbox-.*)\.js$/,
});

const analyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: './report.html',
  openAnalyzer: false,
  defaultSizes: 'gzip',
  generateStatsFile: true,
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
  if (isAnalyze) {
    plugins.push(analyzer);
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
