import { getImage } from 'astro:assets';

import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  type DiscoverMoviesQuery,
} from '$lib/services/movie';
import type { GetServerResponse, SEOMeta } from '$lib/types/general';
import type { MovieListType, MovieOverview } from '$lib/types/movie';

export interface FilterResultListPageProps {
  movieList: MovieOverview[];
  movieListType: MovieListType;
  seoMeta: SEOMeta;
}

const titleMapping: Record<MovieListType, string> = {
  'now-playing': 'Now Playing',
  popular: 'Popular',
  trending: 'Trending This Week',
  upcoming: 'Upcoming',
};

const fetcherMapping: Record<
  MovieListType,
  (query?: DiscoverMoviesQuery) => Promise<MovieOverview[]>
> = {
  'now-playing': fetchNowPlayingMovies,
  popular: fetchPopularMovies,
  trending: fetchTrendingMovies,
  upcoming: fetchUpcomingMovies,
};

function buildSEOMeta(movieListType: MovieListType): SEOMeta {
  const title = titleMapping[movieListType];
  let description = 'Explore ';

  if (movieListType === 'trending') {
    description += 'trending movies on this week';
  } else {
    description += title.toLowerCase() + ' movies';
  }

  description +=
    ' in movies.rofi.link. Thanks to themoviedb.org for the data source.';

  return { description, title };
}

async function getBackdropURL(movieList: MovieOverview[]) {
  let backdropPath: string | undefined;

  for (const movie of movieList) {
    if (movie.backdrop_path) {
      backdropPath = movie.backdrop_path;
      break;
    }
  }

  if (!backdropPath) return null;

  const backdropImage = await getImage({
    'data-tmdb-img': 'backdrop',
    src: backdropPath,
    width: 300,
  });

  return backdropImage.src;
}

export function createGetServerResponse(
  movieListType: MovieListType,
): GetServerResponse<FilterResultListPageProps> {
  return async astro => {
    const fetchMovieList = fetcherMapping[movieListType];
    const movieList = await fetchMovieList({ region: '' });

    if (movieList.length === 0) {
      // TODO: return not found
      return astro.redirect('/', 307);
    }

    const backdropURL = await getBackdropURL(movieList);
    const seoMeta = buildSEOMeta(movieListType);
    if (backdropURL) {
      seoMeta.imageURL = backdropURL;
    }

    return {
      props: {
        movieList,
        movieListType,
        seoMeta,
      },
    };
  };
}
