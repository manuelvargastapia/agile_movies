import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useHistory } from 'react-router-native';
import { loginWithStoredToken } from '../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import { AuthData } from '../../domain/authentication/auth_data';
import NowPlayingList from './components/NowPlayingList';

const MoviesPage = () => {
    const { isLoggedIn, authFailureOrData } = useAppSelector(
        ({ login }) => login,
    );

    const dispatch = useAppDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(loginWithStoredToken());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoggedIn) {
            history.replace('/login');
        }
    }, [history, isLoggedIn]);

    return (
        <View>
            <Text>MOVIES</Text>
            {isLoggedIn && authFailureOrData instanceof AuthData && (
                <NowPlayingList authData={authFailureOrData} />
            )}
        </View>
    );
};

export default MoviesPage;
