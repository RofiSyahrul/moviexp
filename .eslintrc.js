const { alias } = require('./.paths');

/** @type {import('eslint').Linter} */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
    },
    project: './tsconfig.json',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['prettier', '@typescript-eslint', 'import'],
  rules: {
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'react/jsx-filename-extension': 0,
    'global-require': 0,
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-nested-ternary': 0,
    'react-hooks/exhaustive-deps': 'off',
    'import/no-unresolved': [
      2,
      {
        commonjs: true,
        amd: true,
      },
    ],
    camelcase: 'off',
    'react/prop-types': [0],
    'react/destructuring-assignment': 0,
    'react/no-array-index-key': [0],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 0,
    'react/no-access-state-in-setstate': 0,
    'react/jsx-curly-newline': 0,
    'react/display-name': 0,
    'array-callback-return': 0,
    'consistent-return': 0,
    'no-case-declarations': 'off',
    'react/jsx-indent': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
        moduleDirectory: ['node_modules', 'src/', 'config/', 'scripts/'],
      },
      'babel-module': {
        alias,
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
