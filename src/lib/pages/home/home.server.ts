import { fetchTrendingMovies } from '$lib/services/movie';
import type { GetServerResponse } from '$lib/types/general';
import type { MovieOverview } from '$lib/types/movie';

export interface HomeProps {
  trendingMovies: MovieOverview[];
}

export const getServerResponse: GetServerResponse<
  HomeProps
> = async () => {
  const trendingMovies = await fetchTrendingMovies();
  return {
    props: {
      trendingMovies,
    },
  };
};
