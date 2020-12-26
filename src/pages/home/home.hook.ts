import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList } from '@store/movie/actions';
import { MovieState } from '@store/movie/types';
import { useInfiniteScroll } from '@hooks/infinite-scroll';

export function useHome(): Pick<MovieState, 'error' | 'loading' | 'movieList'> {
  const { movieList, loading, error, searchKey, page } = useSelector(
    state => state.movie
  );
  const dispatch = useDispatch();

  const onNextPage = useCallback(() => {
    dispatch(fetchMovieList({ pageChanged: true }));
  }, []);

  useInfiniteScroll({
    containerSelector: '#movie-list-container',
    onNextPage,
  });

  useEffect(() => {
    if (page === 1 && searchKey.length >= 3) {
      dispatch(fetchMovieList());
    }
  }, [searchKey, page]);

  return { movieList, loading, error };
}
