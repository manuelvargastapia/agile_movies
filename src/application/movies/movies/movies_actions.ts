import { Dispatch } from 'redux';
import { Token } from '../../../domain/core/value_objects';
import { MovieFailure } from '../../../domain/movies/movie_failures';
import {
    getMovies,
    MovieAPI,
} from '../../../infrastructure/movies/movies_repository';
import { nowPlayingActions, popularActions } from './movies_slice';

export type MovieFetchAction = (
    token: Token,
    pageNumber: number,
) => (dispatch: Dispatch) => Promise<void>;

export const fetchNowPlayingMovies: MovieFetchAction = (
    token: Token,
    pageNumber: number,
) => {
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

export const fetchPopularMovies: MovieFetchAction = (
    token: Token,
    pageNumber: number,
) => {
    return async (dispatch: Dispatch) => {
        dispatch(popularActions.fetchingStarted());
        const movieFailureOrData = await getMovies(
            token,
            pageNumber,
            MovieAPI.POPULAR,
        );
        if (movieFailureOrData instanceof MovieFailure) {
            dispatch(popularActions.fetchingFailed(movieFailureOrData));
        } else {
            dispatch(popularActions.fetchingSucceeded(movieFailureOrData));
        }
    };
};
