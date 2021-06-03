import { Actor } from '../../../domain/movies/actor';
import { MovieFailure } from '../../../domain/movies/movie_failures';

export interface ActorsState {
    isFetching: boolean;
    actorFailureOrData?: MovieFailure | Actor[];
    tokenExpired: boolean;
}
