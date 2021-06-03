import { ServerError } from '../../domain/user/user_failures';
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
        const { status, data } = await axiosInstance({
            method: 'GET',
            url: '/api/user/me',
            headers: {
                Authorization: `Bearer ${token.value}`,
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
        return new ServerError(500, 'Something wrong happened');
    }
}