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
};

const popularSlice = createSlice({
    name: 'popular',
    initialState,
    reducers: {
        fetchingStarted(state) {
            state.isFetching = true;
        },
        getPopularMovies(
            state,
            action: PayloadAction<MovieFailure | PopularMovie[]>,
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

export const popularActions = popularSlice.actions;
export const popularReducer = popularSlice.reducer;
