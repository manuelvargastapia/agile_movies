import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../application/hooks';
import { AuthData } from '../../domain/authentication/auth_data';
import NowPlayingList from './components/NowPlayingList';
import PopularList from './components/PopularList';

const MoviesPage = () => {
    const { authFailureOrData } = useAppSelector(({ login }) => login);

    return (
        <>
            <View style={styles.nowPlayingContainer}>
                <Text style={styles.title}>Películas de estreno</Text>
                {authFailureOrData instanceof AuthData && (
                    <NowPlayingList authData={authFailureOrData} />
                )}
            </View>
            <View style={styles.popularContainer}>
                <Text style={styles.title}>Películas más populares</Text>
                {authFailureOrData instanceof AuthData && (
                    <PopularList authData={authFailureOrData} />
                )}
            </View>
        </>
    );
};

export default MoviesPage;

const styles = StyleSheet.create({
    nowPlayingContainer: {
        flex: 0.45,
    },
    popularContainer: {
        flex: 0.55,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 24,
        marginLeft: 16,
    },
});
