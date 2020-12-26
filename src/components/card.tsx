import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import isEqual from 'react-fast-compare';
import { Box, Skeleton, Text } from 'goods-core';
import { capitalize } from '@utils/helpers';
import LazyImage from '@components/lazy-image';

type CardLoadedProps = MovieOverview & {
  loading?: false;
};

type CardLoadingProps = Partial<MovieOverview> & {
  loading: true;
};

type CardProps = CardLoadedProps | CardLoadingProps;

const Card = memo<CardProps>(props => {
  const [visible, setVisible] = useState(false);
  return (
    <Box
      w
      bg='white20'
      radius='l'
      shadow='high'
      posi='relative'
      title={props.title}
      transform={visible || props.loading ? 'none' : 'scale(0.8)'}
      transition='transform 400ms ease-in'
      className='card'
    >
      {props.loading ? (
        <Skeleton w pt='150%' radius='8px 8px 0px 0px' />
      ) : (
        <Box
          w
          pt='150%'
          shadow='low'
          bTopLeftRad='l'
          bTopRightRad='l'
          posi='relative'
        >
          <LazyImage
            src={props.poster}
            alt={props.title}
            posi='absolute'
            top='0px'
            left='0px'
            w
            h
            objectFit='cover'
            setVisible={setVisible}
            radius='inherit'
          />
        </Box>
      )}
      {!props.loading && (
        <>
          <Box
            posi='absolute'
            top='4px'
            left='4px'
            px='xxs'
            py='xxxs'
            radius='m'
            bg='black25'
            className={`type-${props.type}`}
          >
            <Text as='span' rule='body' weight='bold' c='white'>
              {capitalize(props.type)}
            </Text>
          </Box>
          <Box
            posi='absolute'
            top='4px'
            right='4px'
            px='xxs'
            py='xxxs'
            radius='m'
            bg='green80'
          >
            <Text as='span' rule='body' c='white'>
              {props.year}
            </Text>
          </Box>
        </>
      )}
      <Box w pt='50%' posi='relative'>
        <Box
          w
          minH='100%'
          posi='absolute'
          top='0px'
          left='0px'
          fAlign='center'
          fJustify='center'
          px='xxs'
        >
          {props.loading ? (
            <>
              {['70%', '85%'].map((w, i) => (
                <Skeleton key={`${w}-${i}`} w={w} mb='xxxs' />
              ))}
            </>
          ) : (
            <Link
              to={`/${props.imdbID}`}
              className='movie-detail-link line-clamp'
            >
              <span>{props.title}</span>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  );
}, isEqual);

Card.displayName = 'Card';

export default Card;
