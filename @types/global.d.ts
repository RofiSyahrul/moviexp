import { compose } from 'redux';
import { BaseAction, State } from '@store/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends State {}

  function useDispatch<TDispatch = Dispatch>(): TDispatch;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const __DEV__: boolean;
  const BASE_URL: string;
  const API_KEY: string;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      BUILD_ENV: 'local' | 'prod';
      BASE_URL: string;
      API_KEY: string;
    }
  }

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }

  type Dispatch = ThunkDispatch<State, unknown, BaseAction>;

  type Action = ThunkAction<void, State, unknown, BaseAction>;

  type ActionMaker<T, S = undefined> = S extends undefined
    ? {
        type: T;
      }
    : {
        type: T;
        payload: S;
      };

  type MovieType = 'movie' | 'series' | 'episode';

  interface MovieOverview {
    title: string;
    year: string;
    imdbID: string;
    type: MovieType;
    poster: string;
  }

  interface RatingItem {
    source: string;
    value: string;
  }

  interface MovieDetail extends MovieOverview {
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    language: string;
    country: string;
    awards: string;
    ratings: RatingItem[];
    metascore: string;
    imdbRating: string;
    imdbVotes: string;
    dvd: string | null;
    boxOffice: string | null;
    production: string;
    website: string | null;
  }
}
