import React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../application/hooks';
import { AuthData } from '../../domain/authentication/auth_data';
import NowPlayingList from './components/NowPlayingList';

const MoviesPage = () => {
    const { authFailureOrData } = useAppSelector(({ login }) => login);

    return (
        <View>
            <Text>MOVIES</Text>
            {authFailureOrData instanceof AuthData && (
                <NowPlayingList authData={authFailureOrData} />
            )}
        </View>
    );
};

export default MoviesPage;
