import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
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
import NowPlayingItem from './NowPlayingItem';
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
            <NowPlayingItem
                key={item.movieId.value}
                item={item}
                onSelectMovie={onSelectMovie}
            />
        );
    }

    function keyExtractor(_: NowPlayingMovie, index: number) {
        return index.toString();
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
                <Carousel
                    data={movieFailureOrData}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth * 0.4}
                    inactiveSlideOpacity={0.4}
                    onEndReachedThreshold={0.1}
                    onEndReached={onEndReached}
                    ListFooterComponent={listFooterComponent}
                    keyExtractor={keyExtractor}
                    enableMomentum
                    decelerationRate={0.9}
                />
            )}
        </>
    );
};

export default NowPlayingList;

const styles = StyleSheet.create({
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
