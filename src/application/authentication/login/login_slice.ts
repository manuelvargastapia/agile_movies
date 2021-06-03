import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData } from '../../../domain/authentication/auth_data';
import {
    AuthFailure,
    TokenExpired,
} from '../../../domain/authentication/auth_failures';
import { EmailAddress, Password } from '../../../domain/core/value_objects';
import { LoginState } from './login_state';

const initialState: LoginState = {
    isLoggedIn: false,
    emailAddress: new EmailAddress(''),
    password: new Password(''),
    isSubmitting: false,
    tokenExpired: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        submittingStarted(state) {
            state.isSubmitting = true;
        },
        login(state, action: PayloadAction<AuthFailure | AuthData>) {
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

            state.authFailureOrData = action.payload;
            state.isSubmitting = false;
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
        emailChanged(state, action: PayloadAction<string>) {
            state.emailAddress = new EmailAddress(action.payload);
        },
        passwordChanged(state, action: PayloadAction<string>) {
            state.password = new Password(action.payload);
        },
    },
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
