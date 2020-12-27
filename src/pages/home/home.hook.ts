import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList } from '@store/movie/actions';
import { MovieState } from '@store/movie/types';
import { useInfiniteScroll } from '@hooks/infinite-scroll';
import { useHistory, useLocation } from 'react-router-dom';
import { parseQs } from '@utils/helpers';

export function useHome(): Pick<
  MovieState,
  'error' | 'loading' | 'movieList' | 'totalMovies'
> {
  const {
    movieList,
    loading,
    error,
    searchKey,
    page,
    totalMovies,
  } = useSelector(state => state.movie);

  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useLocation();

  const onNextPage = useCallback(() => {
    dispatch(fetchMovieList({ pageChanged: true }));
  }, []);

  useInfiniteScroll({
    containerSelector: '#movie-list-container',
    onNextPage,
  });

  useEffect(() => {
    const { s } = parseQs<'s', string>(search);
    if (s && s.length >= 3 && s !== searchKey) {
      dispatch({ type: 'SET_SEARCH_KEY', payload: { searchKey: s } });
    } else {
      history.replace(`?s=${searchKey}`);
    }
    return () => {
      dispatch({ type: 'RESET_ERROR' });
    };
  }, []);

  useEffect(() => {
    if (page === 1 && searchKey.length >= 3) {
      dispatch(fetchMovieList());
    }
  }, [searchKey, page]);

  return { movieList, loading, error, totalMovies };
}
