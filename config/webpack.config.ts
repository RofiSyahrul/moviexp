import * as webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import commonConfig from './webpack.common';

const configFactory: (
  args: Record<string, string>
) => Promise<webpack.Configuration> = async args => {
  if (typeof args !== 'object') return {};
  const { env } = args;
  const imported: { default: webpack.Configuration } = await import(
    `./webpack.${env}`
  );
  const envConfig: webpack.Configuration = imported?.default;
  return webpackMerge(commonConfig, envConfig);
};

export default configFactory;
