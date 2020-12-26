import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchMovies } from '@utils/services';
import { MovieState } from '@store/movie/types';

interface HookProps {
  isHomePage?: boolean;
}

interface HookReturn
  extends Pick<MovieState, 'searchKey' | 'searchFieldShown' | 'totalMovies'> {
  fetchMovieList: FetchOptions;
  searchValue: string;
  onSelect: OnDropdownSelect;
  toggleSearch(): void;
}

export function useSearchbox({
  isHomePage: isHomePageProp,
}: HookProps = {}): HookReturn {
  const { searchKey, searchFieldShown, totalMovies } = useSelector(
    state => state.movie
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [isHomePage, setHomePage] = useState(isHomePageProp);

  const toggleSearch = useCallback(() => {
    dispatch({ type: 'TOGGLE_SEARCH_FIELD' });
  }, []);

  const onSelect = useCallback<OnDropdownSelect>(
    ({ value }) => {
      setSearchValue(value);
      if (isHomePage) {
        window.scrollTo(0, 0);
        dispatch({ type: 'SET_SEARCH_KEY', payload: { searchKey: value } });
        history.replace(`?s=${value}`);
        return;
      }
      history.replace(`/${value}`);
    },
    [isHomePage]
  );

  const fetchMovieList = useCallback<FetchOptions>(
    async ({ page, search }) => {
      const dummyOption: OptionItem = {
        key: 'dummy-option-item',
        value: search,
        label: `Search "${search}"`,
      };
      if (search.length < 3) {
        if (page === 0) {
          return [
            {
              value: 'dummy',
              label: `Type a keyword at least 3 characters`,
              disabled: true,
            },
          ];
        }
        return [];
      }
      try {
        const data = await fetchMovies({ page: page + 1, s: search });
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }
        const movieList = data.Search.map<OptionItem>((item, i) => ({
          key: `${item.Title}-${item.imdbID}-${i}`,
          value: isHomePage ? item.Title : item.imdbID,
          label: item.Title,
        }));
        if (page === 0 && search && isHomePage) {
          return [dummyOption, ...movieList];
        }
        return movieList;
      } catch {
        if (page === 0 && isHomePage) return [dummyOption];
        return [];
      }
    },
    [isHomePage]
  );

  useEffect(() => {
    setHomePage(isHomePageProp);
    setSearchValue('');
  }, [isHomePageProp]);

  return {
    fetchMovieList,
    searchKey,
    onSelect,
    searchValue,
    searchFieldShown,
    toggleSearch,
    totalMovies,
  };
}
