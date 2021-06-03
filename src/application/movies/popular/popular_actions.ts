import { Dispatch } from 'redux';
import { Token } from '../../../domain/core/value_objects';
import {
    getMovies,
    MovieAPI,
} from '../../../infrastructure/movies/movies_repository';
import { popularActions } from './popular_slice';

export const fetchPopularMovies = (token: string, pageNumber: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(popularActions.fetchingStarted());
        const movieFailureOrData = await getMovies(
            new Token(token),
            pageNumber,
            MovieAPI.POPULAR,
        );
        dispatch(popularActions.getPopularMovies(movieFailureOrData));
    };
};
