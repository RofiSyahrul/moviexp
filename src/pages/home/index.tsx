import React, { memo } from 'react';
import { Box } from 'goods-core';
import { ResponsiveValue } from '@styled-system/core';
import Card from '@components/card';
import { useHome } from './home.hook';

const listPlaceholder = Array.from({ length: 10 }, (_, i) => i);

const LoadingPlaceholder = memo(() => {
  return (
    <>
      {listPlaceholder.map(idx => (
        <Card loading key={idx} />
      ))}
    </>
  );
});

const gTempCol: ResponsiveValue<string> = {
  xs: '1fr 1fr',
  lg: 'repeat(4, 1fr)',
  xl: 'repeat(5, 1fr)',
};

const gap: ResponsiveValue<string> = {
  xs: '12px',
  md: '24px',
};

const Home = memo(() => {
  const { movieList, error, loading } = useHome();
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <Box
      as='main'
      w
      p={{ xs: 's', md: 'l' }}
      d='grid'
      gTempCol={gTempCol}
      gap={gap}
      gAutoFlow='row'
      id='movie-list-container'
    >
      {movieList.map((movie, i) => (
        <Card key={`${movie.imdbID}-${i}`} {...movie} />
      ))}
      {loading && <LoadingPlaceholder />}
    </Box>
  );
});

Home.displayName = 'Home';

export default Home;
