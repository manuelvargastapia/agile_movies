import { ServerError, TokenExpired } from '../../domain/user/user_failures';
import { User } from '../../domain/user/user';
import {
    Username,
    Token,
    EmailAddress,
    Firstname,
    Lastname,
} from '../../domain/core/value_objects';
import { axiosInstance } from '../core/axios_instance';
import { UserFailure } from '../../domain/user/user_failures';

export async function getUserInfo(token: Token): Promise<UserFailure | User> {
    try {
        if (!token.isValid()) {
            return new ServerError(500, 'Something wrong happened');
        }

        const { status, data } = await axiosInstance({
            method: 'GET',
            url: '/api/user/me',
            headers: {
                Authorization: `Bearer ${token.getOrCrash()}`,
            },
        });

        if (status === 200) {
            return new User(
                new Username(data.data.username),
                new EmailAddress(data.data.email),
                new Firstname(data.data.firstName),
                new Lastname(data.data.lastName),
            );
        }

        return new ServerError(500, 'Something wrong happened');
    } catch (error) {
        if (error.response.status === 401) {
            return new TokenExpired(
                error.response.status,
                error.response.data.message,
            );
        }

        return new ServerError(500, 'Something wrong happened');
    }
}
