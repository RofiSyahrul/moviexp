import { fetchMovies, MovieListParam } from '@utils/services';

interface Param extends Pick<MovieListParam, 'type' | 'y'> {
  pageChanged?: boolean;
}

const PAGE_LIMIT = 10;

export const fetchMovieList = (params: Param = {}): Action => (
  dispatch,
  getState
) => {
  const { searchKey, page, totalMovies: prevTotalMovies } = getState().movie;
  const { pageChanged, ...restParams } = params;
  if (prevTotalMovies > 0 && pageChanged) {
    const maxPage = Math.ceil(prevTotalMovies / PAGE_LIMIT);
    if (page >= maxPage) return;
  }
  dispatch({ type: 'FETCH_MOVIE_DETAIL_STARTED' });
  fetchMovies({
    ...restParams,
    page: pageChanged ? page + 1 : page,
    s: searchKey,
  })
    .then(data => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }
      const movieList = data.Search.map<MovieOverview>(
        ({ Poster, ...movieRes }) => ({
          title: movieRes.Title,
          imdbID: movieRes.imdbID,
          poster: Poster === 'N/A' ? '' : Poster,
          type: movieRes.Type,
          year: movieRes.Year,
        })
      );
      const totalMovies = parseInt(data.totalResults, 10);
      dispatch({
        type: 'FETCH_MOVIE_LIST_SUCCESS',
        payload: { movieList, totalMovies, pageChanged: Boolean(pageChanged) },
      });
    })
    .catch(error => {
      dispatch({ type: 'FETCH_MOVIE_DETAIL_FAILED', payload: { error } });
    });
};
