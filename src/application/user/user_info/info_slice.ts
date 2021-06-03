import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    EmailAddress,
    Firstname,
    Lastname,
    Username,
} from '../../../domain/core/value_objects';
import { User } from '../../../domain/user/user';
import { TokenExpired, UserFailure } from '../../../domain/user/user_failures';
import { UserInfoState } from './info_state';

const initialState: UserInfoState = {
    isFetching: false,
    tokenExpired: false,
    userFailureOrData: new User(
        new Username(''),
        new EmailAddress(''),
        new Firstname(''),
        new Lastname(''),
    ),
};

const infoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        fetchingStarted(state) {
            state.isFetching = true;
        },
        getUserInfo(state, action: PayloadAction<UserFailure | User>) {
            state.isFetching = false;
            state.userFailureOrData = action.payload;
            state.tokenExpired = action.payload instanceof TokenExpired;
        },
    },
});

export const infoActions = infoSlice.actions;
export const infoReducer = infoSlice.reducer;
