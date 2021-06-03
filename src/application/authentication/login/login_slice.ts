import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData } from '../../../domain/authentication/auth_data';
import {
    AuthFailure,
    TokenExpired,
} from '../../../domain/authentication/auth_failures';
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
    tokenExpired: false,
    authFailureOrData: new AuthData(new Token(''), new RefreshToken('')),
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        submittingStarted(state) {
            state.isSubmitting = true;
        },
        login(state, action: PayloadAction<AuthFailure | AuthData>) {
            state.authFailureOrData = action.payload;
            state.isSubmitting = false;

            if (action.payload instanceof AuthFailure) {
                state.isLoggedIn = false;
                if (action.payload instanceof TokenExpired) {
                    state.tokenExpired = true;
                    // TODO: store tokens and expired state in AsyncStorage
                }
            }

            if (action.payload instanceof AuthData) {
                state.isLoggedIn = true;
                state.tokenExpired = false;
                // TODO: store tokens and expired state in AsyncStorage
            }
        },
        refreshToken(state, action: PayloadAction<AuthFailure | AuthData>) {
            if (action.payload instanceof AuthFailure) {
                state.isLoggedIn = false;
            }

            if (action.payload instanceof AuthData) {
                state.isLoggedIn = true;
                // TODO: update tokens and expired state in AsyncStorage
            }

            state.authFailureOrData = action.payload;
            state.isSubmitting = false;
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
