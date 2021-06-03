import { Dispatch } from 'redux';
import { Token } from '../../../domain/core/value_objects';
import {
    getMovies,
    MovieAPI,
} from '../../../infrastructure/movies/movies_repository';
import { nowPlayingActions } from './now_playing_slice';

export const fetchNowPlayingMovies = (token: string, pageNumber: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(nowPlayingActions.fetchingStarted());
        const movieFailureOrData = await getMovies(
            new Token(token),
            pageNumber,
            MovieAPI.NOW_PLAYING,
        );
        dispatch(nowPlayingActions.getNowPlayingMovies(movieFailureOrData));
    };
};
