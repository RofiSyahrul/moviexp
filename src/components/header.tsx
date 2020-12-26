import React, { memo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Anchor, Box, Icon, Image } from 'goods-core';
import { ResponsiveValue } from '@styled-system/core';
import Searchbox from '@components/searchbox';
import { useSelector } from 'react-redux';

const height: ResponsiveValue<string> = { xs: '84px', lg: '96px' };
const paddingX: ResponsiveValue<string> = { xs: '16px', lg: '32px' };
const imgSize: ResponsiveValue<string> = { xs: '32px', lg: '48px' };
const imgSizeOnSearch: ResponsiveValue<string> = { xs: '0px', lg: '48px' };

const Header = memo(() => {
  const searchFieldShown = useSelector(state => state.movie.searchFieldShown);
  const history = useHistory();
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <Box
      as='section'
      mt={height}
      w
      id={isHomePage ? 'homepage-header-container' : ''}
    >
      <Box
        as='header'
        w
        h={height}
        posi='fixed'
        top='0px'
        left='0px'
        fDir='row'
        fJustify='space-between'
        fAlign='center'
        bg='white'
        shadow='high'
        z='appBar'
        tProperty='width padding flex'
        tDuration='300ms'
        tTimingFunction='ease-in'
        px={paddingX}
      >
        <Box
          as='nav'
          transition='inherit'
          s={searchFieldShown && isHomePage ? imgSizeOnSearch : imgSize}
        >
          {isHomePage ? (
            <Anchor href={GITHUB_URL} target='_blank'>
              <Image
                src={require('@img/ic-github.png')}
                alt='Github icon'
                s='100%'
                radius='full'
              />
            </Anchor>
          ) : (
            <Icon
              name='arrow'
              c='black30'
              s='100%'
              onClick={history.goBack}
              cursor='pointer'
            />
          )}
        </Box>
        <Searchbox
          isHomePage={isHomePage}
          key={isHomePage ? 'homepage' : 'detail'}
        />
      </Box>
    </Box>
  );
});

Header.displayName = 'Header';

export default Header;
