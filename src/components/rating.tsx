import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Box, Text } from 'goods-core';
import LazyImage from '@components/lazy-image';

type RatingProps = Pick<
  MovieDetail,
  'ratings' | 'imdbRating' | 'imdbVotes' | 'metascore'
>;

const Rating = memo<RatingProps>(
  ({ ratings, imdbRating, imdbVotes, metascore }) => {
    if (!Array.isArray(ratings)) return null;

    const finalRatings: RatingItem[] = [
      ...ratings,
      { source: 'Metascore', value: metascore },
    ];
    const title = finalRatings.length > 1 ? 'Ratings' : 'Rating';

    return (
      <Box w p='xxs'>
        <Box w fDir='row' fJustify='space-between' fAlign='center' mb='xxs'>
          <Text as='h5' rule='subtitle' fSize='18px' c='black40' mb='xxxs'>
            {title}
          </Text>
          <Box fDir='row' fAlign='center'>
            <LazyImage
              src={require('@img/ic-imdb.svg')}
              alt='IMDb icon'
              h='24px'
              w='48px'
            />
            <Box f='1' ml='xxxs'>
              <Text as='span' fSize='1.2rem' lineHeight='1' weight='bold'>
                {imdbRating}
              </Text>
              <Text as='span' fSize='12px' lineHeight='1' c='black20'>
                {imdbVotes}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box w>
          {finalRatings.map((rating, i) => (
            <Box mb='xxxs' key={i}>
              <Text as='span' rule='body' fSize='12px' c='black20' mb='2px'>
                {rating.source}
              </Text>
              <Text as='span' rule='body' weight='bold'>
                {rating.value}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    );
  },
  isEqual
);

Rating.displayName = 'Rating';

export default Rating;
