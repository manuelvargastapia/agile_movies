import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { nowPlayingReducer } from './now_playing/now_playing_slice';

export const movieStore = configureStore({
    reducer: {
        nowPlaying: nowPlayingReducer,
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
