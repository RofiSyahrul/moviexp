import { SEARCH_QUERY_KEY } from '$lib/constants/search';
import {
  fetchMovieList,
  type MovieListResponse,
} from '$lib/services/movie';
import type { GetServerResponse } from '$lib/types/general';

export interface HomeProps {
  movieListResponse: MovieListResponse;
}

export const getServerResponse: GetServerResponse<
  HomeProps
> = async astro => {
  const { searchParams } = astro.url;
  const searchKey = searchParams.get(SEARCH_QUERY_KEY);
  if (!searchKey) {
    searchParams.set(SEARCH_QUERY_KEY, 'movie');
    return astro.redirect(astro.url.pathname + astro.url.search, 302);
  }

  const response = await fetchMovieList({ page: 1, s: searchKey });
  return {
    props: {
      movieListResponse: response,
    },
  };
};
