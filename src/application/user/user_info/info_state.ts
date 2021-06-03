import { User } from '../../../domain/user/user';
import { UserFailure } from '../../../domain/user/user_failures';

export interface UserInfoState {
    isFetching: boolean;
    userFailureOrData: UserFailure | User;
    tokenExpired: boolean;
}
