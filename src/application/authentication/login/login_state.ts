import { AuthData } from '../../../domain/authentication/auth_data';
import { AuthFailure } from '../../../domain/authentication/auth_failures';
import { Password, Username } from '../../../domain/core/value_objects';

export interface LoginState {
    isLoggedIn: boolean;
    username: Username;
    password: Password;
    isSubmitting: boolean;
    authFailureOrData: AuthFailure | AuthData;
}
