import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Circle } from 'react-native-progress';
import { AuthData } from '../../../domain/authentication/auth_data';
import { fetchNowPlayingMovies } from '../../../application/movies/now_playing/now_playing_actions';
import { MovieFailure } from '../../../domain/movies/movie_failures';
import { NowPlayingMovie } from '../../../domain/movies/now_playing';
import { useAppDispatch, useAppSelector } from '../../../application/hooks';
import { loginWithRefreshToken } from '../../../application/authentication/login/login_actions';
import { nowPlayingActions } from '../../../application/movies/now_playing/now_playing_slice';

const NowPlayingList: React.FC<{ authData: AuthData }> = ({ authData }) => {
    const { isFetching, pageNumber, movieFailureOrData, tokenExpired } =
        useAppSelector(({ nowPlaying }) => nowPlaying);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(authData.refreshToken));
        }
    }, [authData.refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        dispatch(fetchNowPlayingMovies(authData.token, pageNumber));
    }, [authData.token, dispatch, pageNumber]);

    return (
        <>
            {movieFailureOrData instanceof MovieFailure ? (
                <View>
                    <Text>{movieFailureOrData.message}</Text>
                </View>
            ) : (
                movieFailureOrData.length > 0 && (
                    <Carousel
                        data={movieFailureOrData}
                        renderItem={({ item }: { item: NowPlayingMovie }) => (
                            <View>
                                <Image
                                    style={styles.bannerImage}
                                    resizeMode="contain"
                                    source={{
                                        uri: item.movieBannerUrl.value,
                                    }}
                                />
                            </View>
                        )}
                        sliderWidth={Dimensions.get('screen').width}
                        itemWidth={Dimensions.get('screen').width * 0.5}
                        onEndReached={() => {
                            dispatch(nowPlayingActions.incrementPageNumber());
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
    bannerImage: {
        height: Dimensions.get('screen').width * 0.6,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
    },
});
