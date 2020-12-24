import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box, Text } from 'goods-core';

const ComingSoon: React.FC = () => {
  return (
    <Box as='main' w h='100vh' fAlign='center' fJustify='center'>
      <Text as='h1' weight='bold'>
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
      <Switch>
        <Route path='/:id' component={ComingSoon} />
        <Route path='/' component={ComingSoon} />
      </Switch>
    </Suspense>
  );
};

Page.displayName = 'Page';

export default Page;
