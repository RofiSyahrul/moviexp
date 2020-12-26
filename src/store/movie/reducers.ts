import { MovieState, MovieActionTypes } from './types';

export const initialState: MovieState = {
  loading: false,
  error: null,
  movieDetails: {},
  movieList: [],
  page: 1,
  searchKey: 'movie',
  totalMovies: 0,
};

export function movieReducer(
  state = initialState,
  action: MovieActionTypes
): MovieState {
  const { page, movieList } = state;
  switch (action.type) {
    case 'SET_SEARCH_KEY':
      return { ...state, searchKey: action.payload.searchKey, page: 1 };
    case 'FETCH_MOVIE_LIST_STARTED':
    case 'FETCH_MOVIE_DETAIL_STARTED':
      return { ...state, loading: true, error: null };
    case 'FETCH_MOVIE_LIST_FAILED':
    case 'FETCH_MOVIE_DETAIL_FAILED':
      if (action.payload.error) {
        const { error } = action.payload;
        return {
          ...state,
          loading: false,
          error: error instanceof Error ? error.message : error,
        };
      }
      return state;
    case 'FETCH_MOVIE_LIST_SUCCESS':
      if (action.payload.movieList.length > 0) {
        const { movieList: movieListPayload, pageChanged } = action.payload;
        return {
          ...state,
          loading: false,
          totalMovies: action.payload.totalMovies,
          ...(pageChanged
            ? { page: page + 1, movieList: [...movieList, ...movieListPayload] }
            : { movieList: movieListPayload }),
        };
      }
      return { ...state, loading: false };
    case 'FETCH_MOVIE_DETAIL_SUCCESS':
      return {
        ...state,
        movieDetails: {
          ...state.movieDetails,
          [action.payload.movieDetail.imdbID]: action.payload.movieDetail,
        },
      };
    default:
      return state;
  }
}
