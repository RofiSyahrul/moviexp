import type { AstroGlobal } from 'astro';
import { getImage } from 'astro:assets';

import { MOVIE_PATH_PREFIX } from '$lib/constants/internal-urls';
import { fetchMovieDetail } from '$lib/services/movie';
import type { GetServerResponse, SEOMeta } from '$lib/types/general';
import type { MovieDetail } from '$lib/types/movie';
import {
  buildMovieTitle,
  buildMovieTitleAndSlug,
  getReleaseYear,
} from '$lib/utils/movie';

export interface DetailPageProps {
  movieDetail: MovieDetail;
  seoMeta: SEOMeta;
}

function notFound(astro: AstroGlobal) {
  // TODO: return new Response(null, { status: 404 })
  // when 404 page is avaialble
  return astro.redirect('/', 307);
}

function getIDFromSlug(slug: string): number {
  const [rawId] = slug.split('-');
  return parseInt(rawId);
}

function buildMetaTitle(
  englishTitle: string,
  originalTitle: string,
  releaseYear: string | null,
): string {
  const movieTitle = buildMovieTitle(
    englishTitle,
    originalTitle,
    true,
  );

  if (!releaseYear) return movieTitle;
  return `${movieTitle} (${releaseYear})`;
}

export const getServerResponse: GetServerResponse<
  DetailPageProps
> = async astro => {
  const { params, redirect } = astro;

  const { slug } = params;
  if (!slug) return notFound(astro);

  const id = getIDFromSlug(slug);
  if (!id) return notFound(astro);

  const movieDetail = await fetchMovieDetail(id);
  if (!movieDetail) return notFound(astro);

  const {
    backdrop_path,
    original_title,
    overview,
    release_date,
    title,
  } = movieDetail;

  const { movieTitle, slug: actualSlug } = buildMovieTitleAndSlug(
    id,
    title,
    original_title,
  );

  if (actualSlug !== slug) {
    return redirect(MOVIE_PATH_PREFIX + '/' + actualSlug, 308);
  }

  const releaseYear = getReleaseYear(release_date);

  let backdropURL: string | undefined;
  if (backdrop_path) {
    const img = await getImage({
      'data-tmdb-img': 'backdrop',
      src: backdrop_path,
      width: 300,
    });
    backdropURL = img.src;
  }

  return {
    props: {
      movieDetail: {
        ...movieDetail,
        backdropURL,
        releaseYear,
        resolvedTitle: movieTitle,
        slug,
      },
      seoMeta: {
        description: overview,
        imageURL: backdropURL,
        title: buildMetaTitle(title, original_title, releaseYear),
      },
    },
  };
};
