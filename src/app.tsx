import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoodsProvider } from 'goods-core';
import GlobalStyle from 'goods-core/lib/global-style';
import { appTheme } from '@styles/theme';
import globalStyle from '@styles/global';
import store from './store';
import Page from './pages';

const App: React.FC = () => {
  return (
    <GoodsProvider theme={appTheme} noGlobalStyle>
      <GlobalStyle extra={globalStyle} />
      <Provider store={store}>
        <Router>
          <Page />
        </Router>
      </Provider>
    </GoodsProvider>
  );
};

App.displayName = 'App';

export default App;
