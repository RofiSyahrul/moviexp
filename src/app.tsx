import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoodsProvider } from 'goods-core';
import Page from './pages';

const App: React.FC = () => {
  return (
    <GoodsProvider>
      <Router>
        <Page />
      </Router>
    </GoodsProvider>
  );
};

App.displayName = 'App';

export default App;
