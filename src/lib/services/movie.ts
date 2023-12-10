import type { MovieOverview } from '$lib/types/movie';

import fetcher from './fetcher';

interface MovieListResponse {
  results: MovieOverview[];
}

export async function fetchTrendingMovies(): Promise<
  MovieOverview[]
> {
  try {
    const response = await fetcher<MovieListResponse>({
      url: '/3/trending/movie/week',
    });
    return response.results;
  } catch {
    return [];
  }
}
