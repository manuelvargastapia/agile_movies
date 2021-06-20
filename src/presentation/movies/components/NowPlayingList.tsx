import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { AuthData } from '../../../domain/authentication/auth_data';
import { fetchNowPlayingMovies } from '../../../application/movies/now_playing/now_playing_actions';
import {
    MovieFailure,
    ServerError,
} from '../../../domain/movies/movie_failures';
import { NowPlayingMovie } from '../../../domain/movies/now_playing';
import { useAppDispatch, useAppSelector } from '../../../application/hooks';
import { loginWithRefreshToken } from '../../../application/authentication/login/login_actions';
import { nowPlayingActions } from '../../../application/movies/now_playing/now_playing_slice';
import {
    Colors,
    HelperText,
    TouchableRipple,
    useTheme,
} from 'react-native-paper';
import { useHistory } from 'react-router-native';

const screenWidth = Dimensions.get('screen').width;

const NowPlayingList: React.FC<{ authData: AuthData }> = ({ authData }) => {
    const { colors } = useTheme();

    const history = useHistory();

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

    function onSelectMovie(movie: NowPlayingMovie) {
        history.push(`/movies/${movie.movieId.value}`);
    }

    function onEndReached() {
        dispatch(nowPlayingActions.incrementPageNumber());
    }

    function renderItem({ item }: { item: NowPlayingMovie }) {
        return (
            <TouchableRipple
                onPress={onSelectMovie.bind(null, item)}
                rippleColor={colors.accent}>
                <Image
                    style={styles.bannerImage}
                    resizeMode="contain"
                    source={{
                        uri: item.movieBannerUrl.value,
                    }}
                />
            </TouchableRipple>
        );
    }

    function listFooterComponent() {
        return (
            <>
                {isFetching && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator
                            size={50}
                            animating={true}
                            color={colors.accent}
                        />
                    </View>
                )}
            </>
        );
    }

    return (
        <>
            {movieFailureOrData instanceof MovieFailure ? (
                <View style={styles.HelperTextContainer}>
                    <HelperText
                        style={styles.helperText}
                        type="error"
                        visible={movieFailureOrData instanceof ServerError}
                        padding="none">
                        {movieFailureOrData.message}
                    </HelperText>
                </View>
            ) : (
                movieFailureOrData.length > 0 && (
                    <Carousel
                        data={movieFailureOrData}
                        renderItem={renderItem}
                        sliderWidth={screenWidth}
                        itemWidth={screenWidth / 2}
                        onEndReached={onEndReached}
                        ListFooterComponent={listFooterComponent}
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
        height: screenWidth * 0.6,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
    },
    HelperTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helperText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
    },
});
