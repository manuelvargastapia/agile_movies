import React from 'react';
import { useEffect } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Circle } from 'react-native-progress';
import { loginWithRefreshToken } from '../../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../../application/hooks';
import { fetchPopularMovies } from '../../../application/movies/popular/popular_actions';
import { popularActions } from '../../../application/movies/popular/popular_slice';
import { AuthData } from '../../../domain/authentication/auth_data';
import { MovieFailure } from '../../../domain/movies/movie_failures';

const NowPlayingList: React.FC<{ authData: AuthData }> = ({ authData }) => {
    const { isFetching, movieFailureOrData, pageNumber, tokenExpired } =
        useAppSelector(({ popular }) => popular);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(authData.refreshToken));
        }
    }, [authData.refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        dispatch(fetchPopularMovies(authData.token, pageNumber));
    }, [authData.token, dispatch, pageNumber]);

    return (
        <>
            {movieFailureOrData instanceof MovieFailure ? (
                <View>
                    <Text>{movieFailureOrData.message}</Text>
                </View>
            ) : (
                movieFailureOrData.length > 0 && (
                    <FlatList
                        data={movieFailureOrData}
                        renderItem={({ item }) => (
                            <View style={styles.converImageContainer}>
                                <Image
                                    style={styles.coverImage}
                                    resizeMode="contain"
                                    source={{
                                        uri: item.movieBannerUrl.value,
                                    }}
                                />
                                <Text>{item.movieTitle.value}</Text>
                            </View>
                        )}
                        numColumns={2}
                        onEndReached={() => {
                            dispatch(popularActions.incrementPageNumber());
                        }}
                        ListFooterComponent={
                            <>
                                {isFetching && (
                                    <View style={styles.loaderContainer}>
                                        <Circle size={50} indeterminate />
                                    </View>
                                )}
                            </>
                        }
                        keyExtractor={(_, index) => index.toString()}
                    />
                )
            )}
        </>
    );
};

export default NowPlayingList;

const styles = StyleSheet.create({
    converImageContainer: {
        flex: 1,
        alignItems: 'center',
    },
    coverImage: {
        width: '100%',
        height: Dimensions.get('screen').width * 0.5,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
});
