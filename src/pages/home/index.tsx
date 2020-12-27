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
  xs: '0.8fr',
  sm: '1fr 1fr',
  md: 'repeat(3, 1fr)',
  xl: 'repeat(5, 1fr)',
};

const gap: ResponsiveValue<string> = {
  xs: '12px',
  md: '24px',
};

const Home = memo(() => {
  const { movieList, error, loading, totalMovies } = useHome();
  if (error) {
    return <h1 className='error'>{error}</h1>;
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
      fJustify='center'
      id='movie-list-container'
      className={totalMovies === 1 ? 'one-movie' : ''}
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
