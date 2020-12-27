import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail } from '@store/movie/actions';
import { MovieState } from '@store/movie/types';
import { MovieInfoProps } from '@components/movie-info';

interface HookReturn extends Pick<MovieState, 'error' | 'loading'> {
  movieDetail?: MovieDetail;
  movieInfoList: MovieInfoProps[];
}

export function useDetail(): HookReturn {
  const { id } = useParams<{ id: string }>();
  const { loading, error, movieDetails } = useSelector(state => state.movie);
  const dispatch = useDispatch();

  const { movieDetail, movieInfoList } = useMemo<
    Pick<HookReturn, 'movieDetail' | 'movieInfoList'>
  >(() => {
    const movieInfo = movieDetails[id];
    if (!movieInfo) {
      return { movieDetail: undefined, movieInfoList: [] };
    }
    const { dvd, website } = movieInfo;
    const infoList: MovieInfoProps[] = [
      { label: 'Country', value: movieInfo.country },
      { label: 'Genre', value: movieInfo.genre },
      { label: 'Released', value: movieInfo.released },
      { label: 'Rated', value: movieInfo.rated },
      { label: 'Runtime', value: movieInfo.runtime },
      { label: 'Language', value: movieInfo.language },
      { label: 'Production', value: movieInfo.production },
      {
        label: 'Director',
        value: movieInfo.director,
        className: 'grid-col-1-span-2',
      },
      {
        label: 'Writer',
        value: movieInfo.writer,
        className: 'grid-col-1-span-2',
      },
      {
        label: 'Actors',
        value: movieInfo.actors,
        className: 'grid-col-1-span-2',
      },
      { label: 'Plot', value: movieInfo.plot, className: 'grid-col-1-span-2' },
      { label: 'Box Office', value: movieInfo.boxOffice },
      { label: 'Awards', value: movieInfo.awards },
    ];
    if (dvd && dvd !== 'N/A') {
      infoList.push({
        label: 'DVD',
        value: dvd,
        isLink: dvd.startsWith('http'),
      });
    }
    if (website && website !== 'N/A') {
      infoList.push({
        label: 'Website',
        value: website,
        isLink: website.startsWith('http'),
      });
    }
    return {
      movieDetail: movieInfo,
      movieInfoList: infoList.filter(
        item => item.value && item.value !== 'N/A'
      ),
    };
  }, [id, movieDetails]);

  useEffect(() => {
    if (!movieDetail) {
      dispatch(fetchMovieDetail(id));
    } else if (movieDetail.title) {
      document.title = `${movieDetail.title} | ${DEFAULT_TITLE}`;
    }
    return () => {
      dispatch({ type: 'RESET_ERROR' });
      document.title = DEFAULT_TITLE;
    };
  }, [movieDetail]);

  return { loading, error, movieDetail, movieInfoList };
}
