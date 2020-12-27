import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { Box, Text } from 'goods-core';
import { capitalize } from '@utils/helpers';

interface BasicInfoProps extends Pick<MovieOverview, 'year' | 'type'> {
  context: 'card' | 'detail';
}

const BasicInfo = memo<BasicInfoProps>(({ year, type, context }) => {
  const isCard = context === 'card';
  const node = (
    <>
      <Box
        px='xxs'
        py='xxxs'
        radius='m'
        bg='black25'
        className={`type-${type}`}
        {...(isCard
          ? { posi: 'absolute', top: '4px', left: '4px' }
          : { mr: 'xxxs' })}
      >
        <Text as='span' rule='body' weight='bold' c='white'>
          {capitalize(type)}
        </Text>
      </Box>
      <Box
        px='xxs'
        py='xxxs'
        radius='m'
        bg='green80'
        {...(isCard && { posi: 'absolute', top: '4px', right: '4px' })}
      >
        <Text as='span' rule='body' c='white'>
          {year}
        </Text>
      </Box>
    </>
  );

  if (isCard) return node;

  return (
    <Box fDir='row' h='fit-content'>
      {node}
    </Box>
  );
}, isEqual);

BasicInfo.displayName = 'BasicInfo';

export default BasicInfo;
