import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { loginReducer } from './login/login_slice';

export const authStore = configureStore({
    reducer: {
        login: loginReducer,
    },
    // Disable checker to be able to pass class instances as action payloads
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof authStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AuthDispatch = typeof authStore.dispatch;
