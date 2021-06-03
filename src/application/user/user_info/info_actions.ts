import { Dispatch } from 'redux';
import { Token } from '../../../domain/core/value_objects';
import { getUserInfo } from '../../../infrastructure/user/user_repository';
import { infoActions } from './info_slice';

export const fetchUserInfo = (token: Token) => {
    return async (dispatch: Dispatch) => {
        dispatch(infoActions.fetchingStarted());
        const userFailureOrData = await getUserInfo(new Token(token.value));
        dispatch(infoActions.getUserInfo(userFailureOrData));
    };
};
