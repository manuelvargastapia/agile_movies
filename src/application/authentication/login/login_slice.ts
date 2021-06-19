import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData } from '../../../domain/authentication/auth_data';
import { AuthFailure } from '../../../domain/authentication/auth_failures';
import {
    Password,
    RefreshToken,
    Token,
    Username,
} from '../../../domain/core/value_objects';
import { LoginState } from './login_state';

const initialState: LoginState = {
    isLoggedIn: false,
    username: new Username(''),
    password: new Password(''),
    isSubmitting: false,
    authFailureOrData: new AuthData(new Token(null), new RefreshToken(null)),
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        submittingStarted(state) {
            state.isSubmitting = true;
        },
        loginSucceeded(state, action: PayloadAction<AuthData>) {
            state.authFailureOrData = action.payload;
            state.isSubmitting = false;
            state.isLoggedIn = true;
        },
        loginFailed(state, action: PayloadAction<AuthFailure>) {
            state.authFailureOrData = action.payload;
            state.isSubmitting = false;
            state.isLoggedIn = false;
        },
        usernameChanged(state, action: PayloadAction<string>) {
            state.username = new Username(action.payload);
        },
        passwordChanged(state, action: PayloadAction<string>) {
            state.password = new Password(action.payload);
        },
    },
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
