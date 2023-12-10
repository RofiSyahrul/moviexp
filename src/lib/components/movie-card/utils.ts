export function buildMovieTitle(
  title: string,
  originalTitle?: string,
) {
  if (!originalTitle || title === originalTitle) return title;

  return `${originalTitle} (${title})`;
}
