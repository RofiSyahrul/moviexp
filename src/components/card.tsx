import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import isEqual from 'react-fast-compare';
import { Box, Skeleton } from 'goods-core';
import BasicInfo from '@components/basic-info';
import LazyImage from '@components/lazy-image';
import { useImagePopup } from '@hoc/image-popup';

type CardLoadedProps = MovieOverview & {
  loading?: false;
};

type CardLoadingProps = Partial<MovieOverview> & {
  loading: true;
};

type CardProps = CardLoadedProps | CardLoadingProps;

const Card = memo<CardProps>(props => {
  const [visible, setVisible] = useState(false);
  const { openImagePopup } = useImagePopup();

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
            cursor='pointer'
            onClick={openImagePopup}
          />
        </Box>
      )}
      {!props.loading && (
        <BasicInfo type={props.type} year={props.year} context='card' />
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
