import { DefaultTheme } from 'styled-components';
import { ThemeType } from '@styled-system/core';
import { overrideGoodsTheme } from 'goods-core';

export const appTheme = overrideGoodsTheme({
  colors: {
    green20: '#b2e6d2',
    green50: '#00ab6b',
    red60: '#ec1f27',
    black10: '#b5b5b5',
    black15: '#cccccc',
    black20: '#777777',
    black25: '#6b6b6b',
    black30: '#333333',
    black40: '#222222',
    black45: '#111111',
  } as ThemeType['colors'],
  breakpoints: {
    sm: '481px',
    md: '561px',
    xl: '1081px',
  },
}) as DefaultTheme;
