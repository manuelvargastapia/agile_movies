import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../domain/user/user';
import { UserFailure } from '../../../domain/user/user_failures';
import { UserInfoState } from './info_state';

const initialState: UserInfoState = {
    isFetching: false,
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
        },
    },
});

export const infoActions = infoSlice.actions;
export const infoReducer = infoSlice.reducer;
