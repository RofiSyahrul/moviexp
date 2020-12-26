import React, { memo } from 'react';
import isEqual from 'react-fast-compare';
import { DropdownAsync, DropdownAsyncProps } from 'goods-ui';
import { Box, Icon, Text } from 'goods-core';
import { MovieState } from '@store/movie/types';
import { numberStringify } from '@utils/helpers';
import { useSearchbox } from './searchbox.hook';

interface SearchboxProps {
  isHomePage?: boolean;
}

type SearchSummaryProps = Pick<
  MovieState,
  'searchFieldShown' | 'searchKey' | 'totalMovies'
>;

const SearchSummary = memo<SearchSummaryProps>(
  ({ searchFieldShown, searchKey, totalMovies }) => {
    const title = `Search result for "${searchKey}"`;
    return (
      <Box
        fDir='row'
        fWrap='wrap'
        fJustify='center'
        transition='none'
        {...(searchFieldShown
          ? {
              w: { xs: '0px', lg: 'fit-content' },
              overflow: 'hidden',
              px: { xs: '0', lg: 'xxs' },
              f: { xs: '0', lg: '1' },
            }
          : { w: 'fit-content', px: 'xxs', f: '1' })}
      >
        <Text
          as='span'
          rule='body'
          weight='bold'
          textAlign='center'
          c='black20'
          title={title}
          className='line-clamp search-result-text'
        >
          {title}
        </Text>
        <Text
          as='span'
          rule='body'
          weight='bold'
          fSize='18px'
          textAlign='center'
        >
          {numberStringify(totalMovies, 'movie')}
        </Text>
      </Box>
    );
  },
  isEqual
);

const prefix = <Icon name='search' c='green50' />;

const containerProps: DropdownAsyncProps['containerProps'] = {
  my: '0',
  transition: 'inherit',
  tDuration: '500ms',
};

const containerPropsOnNotShown: DropdownAsyncProps['containerProps'] = {
  ...containerProps,
  overflow: { xs: 'hidden', lg: 'initial' },
};

const width: DropdownAsyncProps['w'] = {
  xs: '100%',
  md: '100%',
  lg: '400px',
  xl: '500px',
};

const widthOnNotShown: DropdownAsyncProps['w'] = {
  ...width,
  xs: '0px',
  sm: '0px',
  md: '0px',
};

const labelProps: DropdownAsyncProps['labelProps'] = {
  filledProps: { c: 'green50' },
  hoverProps: { c: 'green50', bg: 'green10' },
  focusProps: { c: 'green50' },
  c: 'green50',
};

const hoverProps: DropdownAsyncProps['hoverProps'] = { bg: 'green10' };
const focusProps: DropdownAsyncProps['focusProps'] = { bC: 'green50' };

const renderOptionItem: DropdownAsyncProps['renderOptionItem'] = ({
  context,
  value,
  label,
  disabled,
}) => {
  if (disabled) {
    return (
      <Text
        rule='caption'
        fSize='12px'
        c='inherit'
        as='span'
        className='option-disabled'
      >
        {label}
      </Text>
    );
  }
  if (/^Search\s"/.test(label || '')) {
    if (context === 'menu') return <em>{label}</em>;
    return value;
  }
  return label;
};

const Searchbox = memo<SearchboxProps>(({ isHomePage }) => {
  const {
    fetchMovieList,
    searchKey,
    onSelect,
    searchValue,
    searchFieldShown,
    totalMovies,
    toggleSearch,
  } = useSearchbox({
    isHomePage,
  });

  return (
    <Box
      fDir='row'
      f='1'
      fJustify='flex-end'
      fAlign='center'
      transition='inherit'
    >
      {isHomePage && (
        <SearchSummary
          searchFieldShown={searchFieldShown}
          totalMovies={totalMovies}
          searchKey={searchKey}
        />
      )}
      <Icon
        name='search'
        c='green50'
        transition='inherit'
        cursor='pointer'
        onClick={toggleSearch}
        s={searchFieldShown ? '0px' : { xs: '48px', lg: '0px' }}
      />
      <DropdownAsync
        w={searchFieldShown ? width : widthOnNotShown}
        id='movie-searchbox'
        label={isHomePage ? 'Search movies here' : 'Search another movie'}
        placeholder={`e.g: ${searchKey}`}
        noOptionsMessage='No movie found'
        prefix={prefix}
        containerProps={
          searchFieldShown ? containerProps : containerPropsOnNotShown
        }
        labelProps={labelProps}
        hoverProps={hoverProps}
        focusProps={focusProps}
        fetchOptions={fetchMovieList}
        fetchDeps={[isHomePage]}
        renderOptionItem={renderOptionItem}
        onChange={onSelect}
        value={searchValue}
      />
    </Box>
  );
});

Searchbox.displayName = 'Searchbox';

export default Searchbox;
