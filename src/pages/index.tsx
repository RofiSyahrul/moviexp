import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Spinner } from 'goods-core';
import Header from '@components/header';

const HomePage = lazy(
  () => import(/* webpackChunkName: "home-page" */ './home')
);

const DetailPage = lazy(
  () => import(/* webpackChunkName: "detail-page" */ './detail')
);

const fallback = <Spinner c='green50' s='100px' />;

const Page: React.FC = () => {
  return (
    <Suspense fallback={fallback}>
      <Header />
      <Switch>
        <Route path='/:id' exact component={DetailPage} />
        <Route path='/' component={HomePage} />
      </Switch>
    </Suspense>
  );
};

Page.displayName = 'Page';

export default Page;
