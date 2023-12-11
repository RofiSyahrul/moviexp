import { MOVIE_GENRE_ID_MAP } from '$lib/constants/movie/genre';

export function getMovieGenres(genreIds: number[]): string[] {
  const genres: string[] = [];
  const MAX_GENRE = 2;

  for (const id of genreIds) {
    if (genres.length === MAX_GENRE) return genres;

    const genre = MOVIE_GENRE_ID_MAP.get(id);
    if (genre) genres.push(genre);
  }

  return genres;
}
