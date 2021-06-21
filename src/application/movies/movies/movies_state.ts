import { IMovie } from '../../../domain/movies/i_movie';
import { MovieFailure } from '../../../domain/movies/movie_failures';

export interface MoviesState {
    isFetching: boolean;
    movieFailureOrData: MovieFailure | IMovie[];
    tokenExpired: boolean;
    pageNumber: number;
    lastPageNumber: number;
}
