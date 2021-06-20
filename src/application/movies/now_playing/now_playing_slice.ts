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
    lastPageNumber: 0,
    movieFailureOrData: [],
};

const nowPlayingSlice = createSlice({
    name: 'nowPlaying',
    initialState,
    reducers: {
        fetchingStarted(state) {
            state.isFetching = true;
        },
        fetchingSucceeded(state, action: PayloadAction<NowPlayingMovie[]>) {
            state.isFetching = false;

            // If current state is a failure, replace it with the new payload,
            // otherwise create a new one by merge
            if (state.movieFailureOrData instanceof MovieFailure) {
                state.movieFailureOrData = action.payload;
            } else {
                state.movieFailureOrData = [
                    ...(state.movieFailureOrData as NowPlayingMovie[]),
                    ...action.payload,
                ];

                state.lastPageNumber = state.pageNumber;
            }
        },
        fetchingFailed(state, action: PayloadAction<MovieFailure>) {
            state.isFetching = false;
            state.tokenExpired = action.payload instanceof TokenExpired;
            state.movieFailureOrData = action.payload;
            state.pageNumber = 1;
        },
        incrementPageNumber(state) {
            state.pageNumber++;
        },
    },
});

export const nowPlayingActions = nowPlayingSlice.actions;
export const nowPlayingReducer = nowPlayingSlice.reducer;
