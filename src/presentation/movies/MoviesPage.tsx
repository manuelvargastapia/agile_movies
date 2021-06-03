import React from 'react';
import { View, Text } from 'react-native';
import NowPlayingList from './components/NowPlayingList';

const MoviesPage = () => {
    return (
        <View>
            <Text>MOVIES</Text>
            <NowPlayingList />
        </View>
    );
};

export default MoviesPage;
