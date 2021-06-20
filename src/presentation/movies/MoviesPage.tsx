import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, useTheme } from 'react-native-paper';
import { Redirect } from 'react-router-native';
import { useAppSelector } from '../../application/hooks';
import { AuthFailure } from '../../domain/authentication/auth_failures';
import Header from './components/Header';
import NowPlayingList from './components/NowPlayingList';
import PopularList from './components/PopularList';

const MoviesPage = () => {
    const { colors } = useTheme();

    const { authFailureOrData } = useAppSelector(({ login }) => login);

    return (
        <>
            {/* Virtually, this shouldn't happen, but the case still
            needs to be considered */}
            {authFailureOrData instanceof AuthFailure ? (
                <Redirect to="/login" />
            ) : (
                <>
                    <Header authData={authFailureOrData} />
                    <View
                        style={{
                            ...styles.nowPlayingContainer,
                            backgroundColor: colors.backdrop,
                        }}>
                        <Text style={styles.title}>Películas de estreno</Text>
                        <NowPlayingList authData={authFailureOrData} />
                    </View>
                    <View
                        style={{
                            ...styles.popularContainer,
                            backgroundColor: colors.backdrop,
                        }}>
                        <Text style={styles.title}>
                            Películas más populares
                        </Text>
                        <PopularList authData={authFailureOrData} />
                    </View>
                </>
            )}
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
        color: Colors.white,
    },
});
