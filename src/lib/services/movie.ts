import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import type {
  MovieDetailFromResponse,
  MovieOverview,
} from '$lib/types/movie';

import fetcher from './fetcher';

interface MovieListResponse {
  results: MovieOverview[];
}

export interface DiscoverMoviesQuery {
  include_adult?: boolean;
  include_video?: boolean;
  page?: number;
  region?: 'ID' | '';
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  sort_by?: 'popularity.desc';
  with_release_type?: string;
}

export async function fetchTrendingMovies(
  query?: DiscoverMoviesQuery,
): Promise<MovieOverview[]> {
  try {
    const response = await fetcher<MovieListResponse>({
      query,
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

function mergeMovieLists(
  mainMovieList: MovieOverview[],
  additionalMovieList: MovieOverview[],
): MovieOverview[] {
  const movieList = [...mainMovieList];
  const movieListID = new Set(movieList.map(movie => movie.id));

  for (const movie of additionalMovieList) {
    if (!movieListID.has(movie.id)) {
      movieList.push(movie);
    }
  }

  return movieList;
}

export async function fetchNowPlayingMovies(
  query?: DiscoverMoviesQuery,
): Promise<MovieOverview[]> {
  const now = dayjs();
  const threeWeeksBefore = now.subtract(3, 'weeks');

  const commonQuery: DiscoverMoviesQuery = {
    'release_date.gte': formatDate(threeWeeksBefore),
    'release_date.lte': formatDate(now),
    sort_by: 'popularity.desc',
    with_release_type: '2|3',
    ...query,
  };

  const [movieListInIndonesia, movieListInTheWorld] =
    await Promise.all([
      fetchDiscoverMovies({ ...commonQuery, region: 'ID' }),
      fetchDiscoverMovies({ ...commonQuery, region: '' }),
    ]);

  return mergeMovieLists(movieListInIndonesia, movieListInTheWorld);
}

export async function fetchUpcomingMovies(
  query?: DiscoverMoviesQuery,
): Promise<MovieOverview[]> {
  const now = dayjs();
  const oneDayAfter = now.add(1, 'days');
  const oneMonthAfter = now.add(30, 'days');

  const commonQuery: DiscoverMoviesQuery = {
    'release_date.gte': formatDate(oneDayAfter),
    'release_date.lte': formatDate(oneMonthAfter),
    sort_by: 'popularity.desc',
    with_release_type: '2|3',
    ...query,
  };

  const [movieListInIndonesia, movieListInTheWorld] =
    await Promise.all([
      fetchDiscoverMovies({ ...commonQuery, region: 'ID' }),
      fetchDiscoverMovies({ ...commonQuery, region: '' }),
    ]);

  return mergeMovieLists(movieListInIndonesia, movieListInTheWorld);
}

export async function fetchPopularMovies(
  query?: DiscoverMoviesQuery,
): Promise<MovieOverview[]> {
  return await fetchDiscoverMovies({
    sort_by: 'popularity.desc',
    ...query,
  });
}

export async function fetchMovieDetail(
  id: number,
): Promise<MovieDetailFromResponse | null> {
  try {
    return await fetcher<MovieDetailFromResponse>({
      url: '/3/movie/' + id,
    });
  } catch (error) {
    return null;
  }
}
