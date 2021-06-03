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
} from '../../../domain/authentication/value_objects';

export const loginWithCredentials = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loginActions.submittingStarted());
        const authFailureOrData = await login(
            new Username(username),
            new Password(password),
        );
        dispatch(loginActions.login(authFailureOrData));
    };
};

export const loginWithRefreshToken = (token: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(loginActions.submittingStarted());
        const authFailureOrData = await refreshToken(new RefreshToken(token));
        dispatch(loginActions.refreshToken(authFailureOrData));
    };
};
