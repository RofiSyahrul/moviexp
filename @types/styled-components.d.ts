import { ThemeType } from 'goods-core';

export type AdditionalColors = {
  black15: string;
  black25: string;
  black45: string;
};

declare module 'styled-components' {
  interface DefaultTheme {
    colors: ThemeType['colors'] & AdditionalColors;
  }
}
