export interface MovieState {
  loading: boolean;
  error: string | null;
  movieList: MovieOverview[];
  movieDetails: Record<string, MovieDetail>;
  searchKey: string;
  page: number;
  totalMovies: number;
}

type SetSearchKeyAction = ActionMaker<'SET_SEARCH_KEY', { searchKey: string }>;

type FetchMovieListStartedAction = ActionMaker<'FETCH_MOVIE_LIST_STARTED'>;

type FetchMovieListSuccessAction = ActionMaker<
  'FETCH_MOVIE_LIST_SUCCESS',
  { movieList: MovieOverview[]; totalMovies: number; pageChanged: boolean }
>;

type FetchMovieListFailedAction = ActionMaker<
  'FETCH_MOVIE_LIST_FAILED',
  { error: Error | string }
>;

type FetchMovieDetailStartedAction = ActionMaker<'FETCH_MOVIE_DETAIL_STARTED'>;

type FetchMovieDetailSuccessAction = ActionMaker<
  'FETCH_MOVIE_DETAIL_SUCCESS',
  { movieDetail: MovieDetail }
>;

type FetchMovieDetailFailedAction = ActionMaker<
  'FETCH_MOVIE_DETAIL_FAILED',
  { error: Error | string }
>;

export type MovieActionTypes =
  | SetSearchKeyAction
  | FetchMovieListStartedAction
  | FetchMovieListSuccessAction
  | FetchMovieListFailedAction
  | FetchMovieDetailStartedAction
  | FetchMovieDetailSuccessAction
  | FetchMovieDetailFailedAction;
