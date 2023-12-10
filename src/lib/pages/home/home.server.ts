import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '$lib/services/movie';
import type { GetServerResponse } from '$lib/types/general';
import type { MovieOverview } from '$lib/types/movie';

export interface HomeProps {
  nowPlayingMovies: MovieOverview[];
  popularMovies: MovieOverview[];
  trendingMovies: MovieOverview[];
  upcomingMovies: MovieOverview[];
}

export const getServerResponse: GetServerResponse<
  HomeProps
> = async () => {
  const [
    trendingMovies,
    nowPlayingMovies,
    upcomingMovies,
    popularMovies,
  ] = await Promise.all([
    fetchTrendingMovies(),
    fetchNowPlayingMovies(),
    fetchUpcomingMovies(),
    fetchPopularMovies(),
  ]);

  return {
    props: {
      nowPlayingMovies,
      popularMovies,
      trendingMovies,
      upcomingMovies,
    },
  };
};
