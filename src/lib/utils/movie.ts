import dayjs from 'dayjs';

import slugify from './slugify';

export function buildMovieTitle(
  englishTitle: string,
  originalTitle?: string,
  originalTitleOnly = false,
) {
  if (!originalTitle || englishTitle === originalTitle) {
    return englishTitle;
  }

  if (originalTitleOnly) return originalTitle;

  return `${originalTitle} (${englishTitle})`;
}

export function slugifyID(id: number, title: string) {
  const rawSlug = `${id}-${title}`;
  return slugify(rawSlug);
}

export function buildMovieTitleAndSlug(
  id: number,
  englishTitle: string,
  originalTitle?: string,
): { movieTitle: string; slug: string } {
  const movieTitle = buildMovieTitle(englishTitle, originalTitle);
  const slug = slugifyID(
    id,
    buildMovieTitle(englishTitle, originalTitle, true),
  );
  return { movieTitle, slug };
}

export function getReleaseYear(
  releaseDate: string | null,
): string | null {
  if (!releaseDate) return null;
  return dayjs(releaseDate).format('YYYY');
}
