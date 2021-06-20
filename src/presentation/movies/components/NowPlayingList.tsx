import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    TouchableHighlight,
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
import { Colors, HelperText, useTheme } from 'react-native-paper';
import { useHistory } from 'react-router-native';

const screenWidth = Dimensions.get('screen').width;

const NowPlayingList: React.FC<{ authData: AuthData }> = ({ authData }) => {
    const { colors } = useTheme();

    const history = useHistory();

    const {
        isFetching,
        pageNumber,
        lastPageNumber,
        movieFailureOrData,
        tokenExpired,
    } = useAppSelector(({ nowPlaying }) => nowPlaying);

    const fetchingAllowed = pageNumber !== lastPageNumber;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(authData.refreshToken));
        }
    }, [authData.refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        if (fetchingAllowed) {
            dispatch(fetchNowPlayingMovies(authData.token, pageNumber));
        }
    }, [authData.token, dispatch, fetchingAllowed, pageNumber]);

    function onSelectMovie(movie: NowPlayingMovie) {
        history.push('/movies/details', { movie, authData });
    }

    function onEndReached() {
        dispatch(nowPlayingActions.incrementPageNumber());
    }

    function renderItem({ item }: { item: NowPlayingMovie }) {
        return (
            <TouchableHighlight
                onPress={onSelectMovie.bind(null, item)}
                underlayColor={colors.accent}>
                <Image
                    style={styles.bannerImage}
                    resizeMode="contain"
                    source={{
                        uri: item.movieBannerUrl.value,
                    }}
                />
            </TouchableHighlight>
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
                <View style={styles.helperTextContainer}>
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
                        itemWidth={screenWidth * 0.4}
                        inactiveSlideOpacity={0.4}
                        onEndReachedThreshold={0.1}
                        onEndReached={onEndReached}
                        ListFooterComponent={listFooterComponent}
                        keyExtractor={(_, index) => index.toString()}
                        enableMomentum
                        decelerationRate={0.9}
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
    helperTextContainer: {
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
