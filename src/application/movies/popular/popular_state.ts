import { MovieFailure } from '../../../domain/movies/movie_failures';
import { PopularMovie } from '../../../domain/movies/popular';

export interface PopularState {
    isFetching: boolean;
    movieFailureOrData?: MovieFailure | PopularMovie[];
    tokenExpired: boolean;
    pageNumber: number;
}
