import { compose } from 'redux';
import { BaseAction, State } from '@store/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  FetchOptionsHandler,
  OptionItem as OptionItemBase,
  DropdownProps,
} from 'goods-ui/lib/dropdown/_types';

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
  const GITHUB_URL: string;
  const DEFAULT_TITLE: string;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      BUILD_ENV: 'local' | 'prod';
      BASE_URL: string;
      API_KEY: string;
      ANALYZE: string;
    }
  }

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }

  type Primitive = string | number | boolean | null | undefined;
  type General = Primitive | Primitive[] | Record<string, Primitive>;

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

  type MovieType = 'movie' | 'series' | 'episode' | 'game';

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
    dvd: string;
    boxOffice: string;
    production: string;
    website: string;
  }

  type FetchOptions = FetchOptionsHandler;
  type OptionItem = OptionItemBase;
  type OnDropdownSelect = Required<DropdownProps>['onChange'];
}
