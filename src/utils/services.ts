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

interface RatingItemRes {
  Source: string;
  Value: string;
}

interface MovieDetailRes extends MovieOverviewRes {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: RatingItemRes[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: 'True';
}

export interface MovieListParam {
  type?: MovieType;
  y?: string;
  page?: number;
  s?: string;
}

type ErrorRes = {
  Error: string;
  Response: 'False';
};

type MovieListRes =
  | {
      Search: MovieOverviewRes[];
      totalResults: string;
      Response: 'True';
    }
  | ErrorRes;

type MovieRes = MovieDetailRes | ErrorRes;

export async function fetchMovies(
  params: MovieListParam = {}
): Promise<MovieListRes> {
  const { data } = await request.get<MovieListRes>('', { params });
  return data;
}

export async function fetchMovie(id: string): Promise<MovieDetail> {
  const { data } = await request.get<MovieRes>('', { params: { i: id } });
  if (data.Response === 'False') {
    throw new Error(data.Error);
  }
  const { imdbID, imdbRating, imdbVotes } = data;
  return {
    imdbVotes,
    imdbRating,
    imdbID,
    title: data.Title,
    year: data.Year,
    type: data.Type,
    poster: data.Poster,
    rated: data.Rated,
    released: data.Released,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    writer: data.Writer,
    actors: data.Actors,
    plot: data.Plot,
    language: data.Language,
    country: data.Country,
    awards: data.Awards,
    metascore: data.Metascore,
    dvd: data.DVD,
    boxOffice: data.BoxOffice,
    production: data.Production,
    website: data.Website,
    ratings: data.Ratings.map(rating => ({
      source: rating.Source,
      value: rating.Value,
    })),
  };
}
