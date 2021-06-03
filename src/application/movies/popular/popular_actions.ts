import { Dispatch } from 'redux';
import { Token } from '../../../domain/core/value_objects';
import { getPopularMovies } from '../../../infrastructure/movies/movies_repository';
import { popularActions } from './popular_slice';

export const fetchPopularMovies = (token: string, pageNumber: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(popularActions.fetchingStarted());
        const movieFailureOrData = await getPopularMovies(
            new Token(token),
            pageNumber,
        );
        dispatch(popularActions.getPopularMovies(movieFailureOrData));
    };
};
