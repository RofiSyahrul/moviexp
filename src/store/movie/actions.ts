import axios from 'axios';

const request = axios.create({
  baseURL: BASE_URL,
  params: { apikey: API_KEY },
});

interface MovieOverviewRes {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
}

interface MovieListParam {
  type?: MovieType;
  y?: string;
  pageChanged?: boolean;
}

type MovieListRes =
  | {
      Search: MovieOverviewRes[];
      totalResults: string;
      Response: 'True';
    }
  | { Error: string; Response: 'False' };

const PAGE_LIMIT = 10;

export const fetchMovieList = (params: MovieListParam = {}): Action => (
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
  request
    .get<MovieListRes>('', {
      params: {
        s: searchKey,
        page: pageChanged ? page + 1 : page,
        ...restParams,
      },
    })
    .then(({ data }) => {
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
