import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, useTheme } from 'react-native-paper';
import { Redirect, useHistory } from 'react-router-native';
import { loginWithRefreshToken } from '../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import { fetchUserInfo } from '../../application/user/user_info/info_actions';
import { AuthData } from '../../domain/authentication/auth_data';
import { AuthFailure } from '../../domain/authentication/auth_failures';
import Header from './components/Header';
import NowPlayingList from './components/NowPlayingList';
import PopularList from './components/PopularList';

const MoviesPage = () => {
    const { colors } = useTheme();

    const history = useHistory();

    const { authFailureOrData } = useAppSelector(({ login }) => login);

    const { tokenExpired, userFailureOrData } = useAppSelector(
        ({ userInfo }) => userInfo,
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenExpired) {
            if (authFailureOrData instanceof AuthData) {
                dispatch(loginWithRefreshToken(authFailureOrData.refreshToken));
            } else {
                history.replace('/login');
            }
        }
    }, [authFailureOrData, dispatch, history, tokenExpired]);

    useEffect(() => {
        if (authFailureOrData instanceof AuthData) {
            dispatch(fetchUserInfo(authFailureOrData.token));
        }
    }, [authFailureOrData, dispatch]);

    return (
        <>
            {/* Virtually, this shouldn't happen, but the case still
            needs to be considered */}
            {authFailureOrData instanceof AuthFailure ? (
                <Redirect to="/login" />
            ) : (
                <>
                    <Header
                        userFailureOrData={userFailureOrData}
                        title="AgileMovies"
                    />
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
