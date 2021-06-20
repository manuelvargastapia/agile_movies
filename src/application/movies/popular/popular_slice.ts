import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    MovieFailure,
    TokenExpired,
} from '../../../domain/movies/movie_failures';
import { PopularMovie } from '../../../domain/movies/popular';
import { PopularState } from './popular_state';

const initialState: PopularState = {
    isFetching: false,
    tokenExpired: false,
    pageNumber: 1,
    lastPageNumber: 0,
    movieFailureOrData: [],
};

const popularSlice = createSlice({
    name: 'popular',
    initialState,
    reducers: {
        fetchingStarted(state) {
            state.isFetching = true;
        },
        fetchingSucceeded(state, action: PayloadAction<PopularMovie[]>) {
            state.isFetching = false;

            // If current state is a failure, replace it with the new payload,
            // otherwise create a new one by merge
            if (state.movieFailureOrData instanceof MovieFailure) {
                state.movieFailureOrData = action.payload;
            } else {
                state.movieFailureOrData = [
                    ...(state.movieFailureOrData as PopularMovie[]),
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

export const popularActions = popularSlice.actions;
export const popularReducer = popularSlice.reducer;
