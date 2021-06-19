import { Dispatch } from 'redux';
import { loginActions } from './login_slice';
import {
    login,
    refreshToken,
} from '../../../infrastructure/authentication/auth_repository';
import {
    Username,
    Password,
    RefreshToken,
} from '../../../domain/core/value_objects';
import { AuthData } from '../../../domain/authentication/auth_data';
import {
    readAuthData,
    storeAuthData,
} from '../../../infrastructure/authentication/async_storage_repository';
import { AuthFailure } from '../../../domain/authentication/auth_failures';

// This is the first action to be dispatched to try login with the already
// stored data (token in AsyncStorage)
export const loginWithStoredToken = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loginActions.submittingStarted());
        const authFailureOrData = await readAuthData();
        if (authFailureOrData instanceof AuthData) {
            dispatch(loginActions.loginSucceeded(authFailureOrData));
        } else {
            dispatch(loginActions.loginFailed(authFailureOrData));
        }
    };
};

// Action triggered when user manually submits its data to login.
// This case will only take place if loginWithStoredToken() fails
export const loginWithCredentials = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loginActions.submittingStarted());
        const authFailureOrData = await login(
            new Username(username),
            new Password(password),
        );
        if (authFailureOrData instanceof AuthData) {
            const failureOrSuccess = await storeAuthData(authFailureOrData);
            if (failureOrSuccess instanceof AuthFailure) {
                dispatch(loginActions.loginFailed(failureOrSuccess));
            } else {
                dispatch(loginActions.loginSucceeded(authFailureOrData));
            }
        } else {
            dispatch(loginActions.loginFailed(authFailureOrData));
        }
    };
};

// This is an alternative way of login. This action will be triggered
// only if the current token is rejected as "expired" by the backend
export const loginWithRefreshToken = (token: RefreshToken) => {
    return async (dispatch: Dispatch) => {
        const authFailureOrData = await refreshToken(token);
        if (authFailureOrData instanceof AuthData) {
            const failureOrSuccess = await storeAuthData(authFailureOrData);
            if (failureOrSuccess instanceof AuthFailure) {
                dispatch(loginActions.loginFailed(failureOrSuccess));
            } else {
                dispatch(loginActions.loginSucceeded(authFailureOrData));
            }
        } else {
            dispatch(loginActions.loginFailed(authFailureOrData));
        }
    };
};
