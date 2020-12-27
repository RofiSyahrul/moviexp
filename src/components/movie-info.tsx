import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Anchor, Text } from 'goods-core';

export interface MovieInfoProps {
  label: string;
  value: string;
  className?: string;
  isLink?: boolean;
}

const MovieInfo = memo<MovieInfoProps>(
  ({ label, value, className, isLink }) => {
    return (
      <>
        <Text
          as='span'
          rule='body'
          weight='bold'
          c='black40'
          className={className}
        >
          {label}
        </Text>
        {isLink ? (
          <Anchor
            rule='body'
            c='black30'
            textDecor='underline'
            fontStyle='italic'
            href={value}
            target='_blank'
            className={className}
          >
            {value}
          </Anchor>
        ) : (
          <Text as='span' rule='body' className={className}>
            {value}
          </Text>
        )}
      </>
    );
  },
  isEqual
);

MovieInfo.displayName = 'MovieInfo';

export default MovieInfo;
