import { useCallback, useEffect, useMemo, useState } from 'react';
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
  searchPlaceholder: string;
  onSelect: OnDropdownSelect;
  toggleSearch(): void;
  onKeyDown(e: React.KeyboardEvent): void;
}

const examples = [
  'avengers',
  'cinta',
  'batman',
  'captain',
  'doraemon',
  'iron',
  'start-up',
  'kita',
];

const totalExample = examples.length;

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

  const searchPlaceholder = useMemo(() => {
    const index = Math.floor(Math.random() * totalExample);
    return `e.g: ${examples[index] || examples[0]}`;
  }, [searchFieldShown]);

  const toggleSearch = useCallback(() => {
    dispatch({ type: 'TOGGLE_SEARCH_FIELD' });
  }, []);

  const onSelect = useCallback<OnDropdownSelect>(
    ({ value }) => {
      setSearchValue(value);
      const inputEl = document.getElementById('dropdown-async-movie-searchbox');
      if (inputEl instanceof HTMLInputElement) {
        inputEl.blur();
      }
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

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        isHomePage &&
        e.key === 'Enter' &&
        e.target instanceof HTMLInputElement &&
        e.target.value.length >= 3
      ) {
        onSelect({
          value: e.target.value,
        } as Parameters<OnDropdownSelect>[0]);
        e.preventDefault();
      }
    },
    [onSelect, isHomePage]
  );

  useEffect(() => {
    setHomePage(isHomePageProp);
    setSearchValue('');
  }, [isHomePageProp]);

  return {
    fetchMovieList,
    searchKey,
    searchPlaceholder,
    onSelect,
    searchValue,
    searchFieldShown,
    toggleSearch,
    totalMovies,
    onKeyDown,
  };
}
