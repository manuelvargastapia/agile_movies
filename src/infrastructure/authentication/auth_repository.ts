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
                data.data.payload.token,
                data.data.payload.refresh_token,
            );
        }

        return new ServerError(500, 'Something wrong happened');
    } catch (error) {
        if (error.response.status === 400) {
            return new InvalidCredentials(
                error.response.status,
                error.response.data.message,
            );
        }

        if (error.response.status === 401) {
            return new TokenExpired(
                error.response.status,
                error.response.data.message,
            );
        }

        return new ServerError(500, 'Something wrong happened');
    }
}

export async function refreshToken(
    token: RefreshToken,
): Promise<AuthFailure | AuthData> {
    try {
        const { status, data } = await axiosInstance({
            method: 'POST',
            url: '/api/auth/refresh',
            data: {
                refresh_token: token.value,
            },
        });

        if (status === 201) {
            return new AuthData(data.data.payload.token);
        }

        return new ServerError(500, 'Something wrong happened');
    } catch (error) {
        return new ServerError(500, 'Something wrong happened');
    }
}
