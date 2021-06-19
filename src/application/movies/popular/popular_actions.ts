import { Dispatch } from 'redux';
import { Token } from '../../../domain/core/value_objects';
import { MovieFailure } from '../../../domain/movies/movie_failures';
import {
    getMovies,
    MovieAPI,
} from '../../../infrastructure/movies/movies_repository';
import { popularActions } from './popular_slice';

export const fetchPopularMovies = (token: Token, pageNumber: number) => {
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
