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

export interface MovieListParam {
  type?: MovieType;
  y?: string;
  page?: number;
  s?: string;
}

type MovieListRes =
  | {
      Search: MovieOverviewRes[];
      totalResults: string;
      Response: 'True';
    }
  | { Error: string; Response: 'False' };

export async function fetchMovies(
  params: MovieListParam = {}
): Promise<MovieListRes> {
  const { data } = await request.get<MovieListRes>('', { params });
  return data;
}
