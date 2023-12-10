import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import type { MovieOverview } from '$lib/types/movie';

import fetcher from './fetcher';

interface MovieListResponse {
  results: MovieOverview[];
}

interface DiscoverMoviesQuery {
  include_adult?: boolean;
  include_video?: boolean;
  page?: number;
  region?: 'ID';
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  sort_by?: 'popularity.desc';
  with_release_type?: string;
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

async function fetchDiscoverMovies({
  page = 1,
  region = 'ID',
  ...query
}: DiscoverMoviesQuery = {}): Promise<MovieOverview[]> {
  try {
    const response = await fetcher<
      MovieListResponse,
      DiscoverMoviesQuery
    >({
      query: {
        ...query,
        page,
        region,
      },
      url: '/3/discover/movie',
    });

    return response.results;
  } catch {
    return [];
  }
}

function formatDate(dayjsObject: Dayjs) {
  return dayjsObject.format('YYYY-MM-DD');
}

export async function fetchNowPlayingMovies(): Promise<
  MovieOverview[]
> {
  const now = dayjs();
  const threeWeeksBefore = now.subtract(3, 'weeks');

  return await fetchDiscoverMovies({
    'release_date.gte': formatDate(threeWeeksBefore),
    'release_date.lte': formatDate(now),
    sort_by: 'popularity.desc',
    with_release_type: '2|3',
  });
}

export async function fetchUpcomingMovies(): Promise<
  MovieOverview[]
> {
  const now = dayjs();
  const oneDayAfter = now.add(1, 'days');
  const oneMonthAfter = now.add(30, 'days');

  return await fetchDiscoverMovies({
    'release_date.gte': formatDate(oneDayAfter),
    'release_date.lte': formatDate(oneMonthAfter),
    sort_by: 'popularity.desc',
  });
}

export async function fetchPopularMovies(): Promise<MovieOverview[]> {
  return await fetchDiscoverMovies({
    sort_by: 'popularity.desc',
  });
}
