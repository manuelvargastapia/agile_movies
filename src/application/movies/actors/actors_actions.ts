import { Dispatch } from 'redux';
import { MovieId, Token } from '../../../domain/core/value_objects';
import { getMovieActors } from '../../../infrastructure/movies/movies_repository';
import { actorsActions } from './actors_slice';

export const fetchMovieActors = (token: Token, movieId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(actorsActions.fetchingStarted());
        const actorFailureOrData = await getMovieActors(
            token,
            new MovieId(movieId),
        );
        dispatch(actorsActions.getMovieActors(actorFailureOrData));
    };
};
