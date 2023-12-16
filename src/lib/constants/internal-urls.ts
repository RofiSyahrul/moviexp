export const MOVIE_PATH_PREFIX = '/movie' as const;

export const MOVIE_LIST_NOW_PLAYING =
  `${MOVIE_PATH_PREFIX}/now-playing` as const;

export const MOVIE_LIST_POPULAR =
  `${MOVIE_PATH_PREFIX}/popular` as const;

export const MOVIE_LIST_TRENDING =
  `${MOVIE_PATH_PREFIX}/trending` as const;

export const MOVIE_LIST_UPCOMING =
  `${MOVIE_PATH_PREFIX}/upcoming` as const;
