import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Box, Spinner, Text } from 'goods-core';
import BasicInfo from '@components/basic-info';
import LazyImage from '@components/lazy-image';
import MovieInfo from '@components/movie-info';
import Rating from '@components/rating';
import { useDetail } from './detail.hook';

type BasicAndTitleInfoProps = Pick<MovieDetail, 'title' | 'type' | 'year'>;

const BasicAndTitleInfo = memo<BasicAndTitleInfoProps>(
  ({ title, type, year }) => {
    return (
      <Box
        w
        as='section'
        fDir='row'
        fJustify='space-between'
        fWrap='wrap'
        fAlign='center'
        gCol={{ xs: '1', md: '1 / span 2' }}
      >
        <Text as='h1' rule='title' weight='bold' c='black40'>
          {title}
        </Text>
        <BasicInfo year={year} type={type} context='detail' />
      </Box>
    );
  },
  isEqual
);

const DetailPage = memo(() => {
  const { loading, error, movieDetail, movieInfoList } = useDetail();

  if (loading || (!movieDetail && !error)) {
    return <Spinner c='green50' s='100px' />;
  }

  if (error) {
    return <h1 className='error'>{error}</h1>;
  }

  const {
    title = '',
    poster = '',
    year = '',
    type = 'movie',
    ratings = [],
    imdbRating = '',
    imdbVotes = '',
    metascore = '',
  } = movieDetail || {};

  return (
    <Box
      as='main'
      className='movie-detail-container'
      posi='relative'
      w
      d='grid'
      gAutoFlow='row'
      p={{ xs: 's', lg: 'l' }}
      gTempCol={{ xs: '1fr', md: '1fr 1.5fr', lg: '1fr 2fr' }}
      gap={{ xs: '16px', lg: '24px' }}
    >
      <BasicAndTitleInfo title={title} type={type} year={year} />
      <Box as='hr' gCol={{ xs: '1', md: '1 / span 2' }} />
      <Box
        as='section'
        w
        radius='l'
        shadow='low'
        bg='white20'
        h='max-content'
        posi={{ md: 'sticky' }}
        top={{ md: '96px' }}
        left={{ md: '0px' }}
      >
        <LazyImage
          src={poster}
          alt={title}
          w
          objectFit='contain'
          bTopLeftRad='l'
          bTopRightRad='l'
          shadow='low'
        />
        <Rating
          ratings={ratings}
          imdbRating={imdbRating}
          imdbVotes={imdbVotes}
          metascore={metascore}
        />
      </Box>
      <Box
        w
        as='section'
        d='grid'
        gTempCol='80px 1fr'
        gap='8px'
        gAutoFlow='row'
        h='max-content'
        posi={{ md: 'sticky' }}
        top={{ md: '96px' }}
        right={{ md: '0px' }}
      >
        {movieInfoList.map((item, i) => (
          <MovieInfo key={`${i}-${item.label}`} {...item} />
        ))}
      </Box>
    </Box>
  );
});

DetailPage.displayName = 'DetailPage';

export default DetailPage;
