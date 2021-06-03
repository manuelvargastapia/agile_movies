import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { infoReducer } from './user_info/info_slice';

export const userStore = configureStore({
    reducer: {
        info: infoReducer,
    },
    // Disable checker to be able to pass class instances as action payloads
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof userStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type UserDispatch = typeof userStore.dispatch;
