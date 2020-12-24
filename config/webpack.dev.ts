import * as webpack from 'webpack';
import 'webpack-dev-server';

const devConfig: webpack.Configuration = {
  mode: 'development',
  devtool: 'nosources-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    port: 3456,
  },
};

export default devConfig;
