import { Dispatch } from 'redux';
import { Token } from '../../../domain/core/value_objects';
import { getUserInfo } from '../../../infrastructure/user/user_repository';
import { infoActions } from './info_slice';

export const fetchUserInfo = (token: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(infoActions.fetchingStarted());
        const userFailureOrData = await getUserInfo(new Token(token));
        dispatch(infoActions.getUserInfo(userFailureOrData));
    };
};
