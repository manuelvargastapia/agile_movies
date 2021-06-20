import { MovieFailure } from '../../../domain/movies/movie_failures';
import { NowPlayingMovie } from '../../../domain/movies/now_playing';

export interface NowPlayingState {
    isFetching: boolean;
    movieFailureOrData: MovieFailure | NowPlayingMovie[];
    tokenExpired: boolean;
    pageNumber: number;
    lastPageNumber: number;
}
