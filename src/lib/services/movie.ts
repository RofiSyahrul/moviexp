import type { MovieType } from '$lib/types/movie';

import fetcher from './fetcher';

interface FetchMovieListQuery {
  page?: number;
  s?: string;
  type?: MovieType;
  y?: string;
}

interface ErrorResponse {
  Error: string;
  Response: 'False';
}

interface MovieOverviewResponse {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
}

interface MovieListSuccessResponse {
  Search: MovieOverviewResponse[];
  totalResults: string;
  Response: 'True';
}

export type MovieListResponse =
  | MovieListSuccessResponse
  | ErrorResponse;

export async function fetchMovieList(
  query: FetchMovieListQuery = {},
): Promise<MovieListResponse> {
  try {
    return await fetcher<MovieListResponse>({
      query,
      url: '/',
    });
  } catch (error_) {
    const error = error_ as Error;
    return {
      Error: error?.message ?? 'Error',
      Response: 'False',
    };
  }
}
