import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { css } from 'styled-components';
import { GlobalStyle, GoodsProvider } from 'goods-core';
import { appTheme } from '@styles/theme';
import appStyle from '@styles/global';

const Provider: React.FC = ({ children }) => {
  return (
    <GoodsProvider noGlobalStyle theme={appTheme}>
      <GlobalStyle extra={appStyle} fontFace={css``} />
      {children}
    </GoodsProvider>
  );
};

export const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: Provider, ...options });

export * from '@testing-library/react';
