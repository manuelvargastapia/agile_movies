import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../../../domain/movies/i_movie';
import {
    MovieFailure,
    TokenExpired,
} from '../../../domain/movies/movie_failures';
import { MoviesState } from './movies_state';

// This slice is a "merge" between all the possible instances
// of a movie: Popular and NowPlaying. Due to its similarities,
// we decided to take this approach to reduce the code duplication
// and complexity

const initialState: MoviesState = {
    isFetching: false,
    tokenExpired: false,
    pageNumber: 1,
    lastPageNumber: 0,
    movieFailureOrData: [],
};

const reducers = {
    fetchingStarted(state: MoviesState) {
        state.isFetching = true;
    },
    fetchingSucceeded(state: MoviesState, action: PayloadAction<IMovie[]>) {
        state.isFetching = false;

        // If current state is a failure, replace it with the new payload,
        // otherwise create a new one by merge
        if (state.movieFailureOrData instanceof MovieFailure) {
            state.movieFailureOrData = action.payload;
        } else {
            state.movieFailureOrData = [
                ...(state.movieFailureOrData as IMovie[]),
                ...action.payload,
            ];

            state.lastPageNumber = state.pageNumber;
        }
    },
    fetchingFailed(state: MoviesState, action: PayloadAction<MovieFailure>) {
        state.isFetching = false;
        state.tokenExpired = action.payload instanceof TokenExpired;
        state.movieFailureOrData = action.payload;
        state.pageNumber = 1;
    },
    incrementPageNumber(state: MoviesState) {
        state.pageNumber++;
    },
};

const popularSlice = createSlice({
    name: 'popular',
    initialState,
    reducers,
});

const nowPlayingSlice = createSlice({
    name: 'nowPlaying',
    initialState,
    reducers,
});

export const popularActions = popularSlice.actions;
export const popularReducer = popularSlice.reducer;
export const nowPlayingActions = nowPlayingSlice.actions;
export const nowPlayingReducer = nowPlayingSlice.reducer;
