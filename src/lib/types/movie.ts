export type MovieType = 'movie' | 'series' | 'episode' | 'game';

export interface MovieOverview {
  imdbID: string;
  poster: string;
  title: string;
  type: MovieType;
  year: string;
}
