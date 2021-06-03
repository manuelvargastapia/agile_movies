import { AuthData } from '../../../domain/authentication/auth_data';
import { AuthFailure } from '../../../domain/authentication/auth_failures';
import {
    EmailAddress,
    Password,
} from '../../../domain/authentication/value_objects';

export interface LoginState {
    isLoggedIn: boolean;
    emailAddress: EmailAddress;
    password: Password;
    isSubmitting: boolean;
    tokenExpired: boolean;
    authFailureOrData?: AuthFailure | AuthData;
}
