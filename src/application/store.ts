import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { loginReducer } from './authentication/login/login_slice';
import { actorsReducer } from './movies/actors/actors_slice';
import { nowPlayingReducer } from './movies/now_playing/now_playing_slice';
import { popularReducer } from './movies/popular/popular_slice';
import { infoReducer } from './user/user_info/info_slice';

export const appStore = configureStore({
    reducer: {
        login: loginReducer,
        nowPlaying: nowPlayingReducer,
        popular: popularReducer,
        actors: actorsReducer,
        userInfo: infoReducer,
    },
    // Disable checker to be able to pass class instances as action payloads
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
