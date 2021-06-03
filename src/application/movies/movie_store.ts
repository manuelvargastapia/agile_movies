import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { actorsReducer } from './actors/actors_slice';
import { nowPlayingReducer } from './now_playing/now_playing_slice';
import { popularReducer } from './popular/popular_slice';

export const movieStore = configureStore({
    reducer: {
        nowPlaying: nowPlayingReducer,
        popular: popularReducer,
        actors: actorsReducer,
    },
    // Disable checker to be able to pass class instances as action payloads
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof movieStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type MovieDispatch = typeof movieStore.dispatch;
