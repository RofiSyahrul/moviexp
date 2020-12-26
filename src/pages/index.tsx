import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box, Text } from 'goods-core';
import Header from '@components/header';
import Home from './home';

const ComingSoon: React.FC = () => {
  return (
    <Box as='main' w h='100%' fAlign='center' fJustify='center' px='s'>
      <Text as='h1' weight='bold' textAlign='center'>
        This page is under development
        <span role='img' aria-label='film'>
          &nbsp;🎞
        </span>
      </Text>
    </Box>
  );
};

const Page: React.FC = () => {
  return (
    <Suspense fallback=''>
      <Header />
      <Switch>
        <Route path='/:id' exact component={ComingSoon} />
        <Route path='/' component={Home} />
      </Switch>
    </Suspense>
  );
};

Page.displayName = 'Page';

export default Page;
