import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Actor } from '../../../domain/movies/actor';
import {
    MovieFailure,
    TokenExpired,
} from '../../../domain/movies/movie_failures';
import { ActorsState } from './actors_state';

const initialState: ActorsState = {
    isFetching: false,
    tokenExpired: false,
    actorFailureOrData: [],
};

const actorsSlice = createSlice({
    name: 'actors',
    initialState,
    reducers: {
        fetchingStarted(state) {
            state.isFetching = true;
        },
        getMovieActors(state, action: PayloadAction<MovieFailure | Actor[]>) {
            state.isFetching = false;
            state.actorFailureOrData = action.payload;
            state.tokenExpired = action.payload instanceof TokenExpired;
        },
        clearActors(state) {
            state.actorFailureOrData = [];
        },
    },
});

export const actorsActions = actorsSlice.actions;
export const actorsReducer = actorsSlice.reducer;
