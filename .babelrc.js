const { alias, src } = require('./.paths');

/** @type {import('@babel/core').TransformOptions} */
const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
    'goods-core/babel/preset',
    'goods-ui/babel/preset',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-optional-chaining',
    '@babel/plugin-proposal-optional-chaining',
    'syntax-dynamic-import',
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js'],
        root: [src],
        alias,
      },
    ],
  ],
};

module.exports = config;
