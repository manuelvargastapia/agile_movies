import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    MovieFailure,
    TokenExpired,
} from '../../../domain/movies/movie_failures';
import { NowPlayingMovie } from '../../../domain/movies/now_playing';
import { NowPlayingState } from './now_playing_state';

const initialState: NowPlayingState = {
    isFetching: false,
    tokenExpired: false,
    pageNumber: 1,
    movieFailureOrData: [],
};

const nowPlayingSlice = createSlice({
    name: 'nowPlaying',
    initialState,
    reducers: {
        fetchingStarted(state) {
            state.isFetching = true;
        },
        getNowPlayingMovies(
            state,
            action: PayloadAction<MovieFailure | NowPlayingMovie[]>,
        ) {
            state.isFetching = false;
            state.movieFailureOrData = action.payload;

            if (action.payload instanceof TokenExpired) {
                state.tokenExpired = true;
            } else {
                state.tokenExpired = false;
                state.pageNumber++;
            }
        },
    },
});

export const nowPlayingActions = nowPlayingSlice.actions;
export const nowPlayingReducer = nowPlayingSlice.reducer;
