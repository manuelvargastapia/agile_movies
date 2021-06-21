import { AuthData } from '../../domain/authentication/auth_data';
import {
    AuthFailure,
    InvalidCredentials,
    ServerError,
    TokenExpired,
} from '../../domain/authentication/auth_failures';
import {
    Username,
    Password,
    RefreshToken,
    Token,
} from '../../domain/core/value_objects';
import { axiosInstance } from '../core/axios_instance';

export async function login(
    username: Username,
    password: Password,
): Promise<AuthFailure | AuthData> {
    try {
        const { status, data } = await axiosInstance({
            method: 'POST',
            url: '/api/auth/login',
            data: {
                username: username.value,
                password: password.value,
            },
        });

        if (status === 201) {
            return new AuthData(
                new Token(data.data.payload.token),
                new RefreshToken(data.data.payload.refresh_token),
            );
        }

        return new ServerError('Something wrong happened', 500);
    } catch (error) {
        if (error.response.status === 400) {
            return new InvalidCredentials(
                error.response.data.message,
                error.response.status,
            );
        }

        if (error.response.status === 401) {
            return new TokenExpired(
                error.response.data.message,
                error.response.status,
            );
        }

        return new ServerError('Something wrong happened', 500);
    }
}

export async function refreshToken(
    token: RefreshToken,
): Promise<AuthFailure | AuthData> {
    try {
        if (!token.isValid()) {
            return new ServerError('Something wrong happened', 500);
        }

        const { status, data } = await axiosInstance({
            method: 'POST',
            url: '/api/auth/refresh',
            data: {
                refresh_token: token.getOrCrash(),
            },
        });

        if (status === 201) {
            // We create a new instance but keeping the original refresh token
            // for further refreshes
            return new AuthData(new Token(data.data.payload.token), token);
        }

        return new ServerError('Something wrong happened', 500);
    } catch (error) {
        return new ServerError('Something wrong happened', 500);
    }
}
