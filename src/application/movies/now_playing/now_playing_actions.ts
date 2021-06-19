import { Dispatch } from 'redux';
import { Token } from '../../../domain/core/value_objects';
import { MovieFailure } from '../../../domain/movies/movie_failures';
import {
    getMovies,
    MovieAPI,
} from '../../../infrastructure/movies/movies_repository';
import { nowPlayingActions } from './now_playing_slice';

export const fetchNowPlayingMovies = (token: Token, pageNumber: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(nowPlayingActions.fetchingStarted());
        const movieFailureOrData = await getMovies(
            token,
            pageNumber,
            MovieAPI.NOW_PLAYING,
        );
        if (movieFailureOrData instanceof MovieFailure) {
            dispatch(nowPlayingActions.fetchingFailed(movieFailureOrData));
        } else {
            dispatch(nowPlayingActions.fetchingSucceeded(movieFailureOrData));
        }
    };
};
