import React from 'react';
import { useEffect } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Colors,
    HelperText,
    TouchableRipple,
    useTheme,
} from 'react-native-paper';
import { useHistory } from 'react-router-native';
import { loginWithRefreshToken } from '../../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../../application/hooks';
import { fetchPopularMovies } from '../../../application/movies/popular/popular_actions';
import { popularActions } from '../../../application/movies/popular/popular_slice';
import { AuthData } from '../../../domain/authentication/auth_data';
import {
    MovieFailure,
    ServerError,
} from '../../../domain/movies/movie_failures';
import { PopularMovie } from '../../../domain/movies/popular';

const PopularList: React.FC<{ authData: AuthData }> = ({ authData }) => {
    const { colors } = useTheme();

    const history = useHistory();

    const {
        isFetching,
        movieFailureOrData,
        pageNumber,
        lastPageNumber,
        tokenExpired,
    } = useAppSelector(({ popular }) => popular);

    const fetchingAllowed = pageNumber !== lastPageNumber;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(authData.refreshToken));
        }
    }, [authData.refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        if (fetchingAllowed) {
            dispatch(fetchPopularMovies(authData.token, pageNumber));
        }
    }, [authData.token, dispatch, fetchingAllowed, pageNumber]);

    function onSelectMovie(movie: PopularMovie) {
        history.push('/movies/details', { movie, authData });
    }

    function onEndReached() {
        dispatch(popularActions.incrementPageNumber());
    }

    function renderItem({ item }: { item: PopularMovie }) {
        return (
            <TouchableRipple
                style={styles.converImageContainer}
                onPress={onSelectMovie.bind(null, item)}
                rippleColor={colors.accent}>
                <>
                    <Image
                        style={styles.coverImage}
                        resizeMode="contain"
                        source={{
                            uri: item.movieBannerUrl.value,
                        }}
                    />
                    <Text style={styles.movieTitle}>
                        {item.movieTitle.value}
                    </Text>
                </>
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
                    <FlatList
                        data={movieFailureOrData}
                        renderItem={renderItem}
                        numColumns={2}
                        onEndReached={onEndReached}
                        ListFooterComponent={listFooterComponent}
                        keyExtractor={(_, index) => index.toString()}
                    />
                )
            )}
        </>
    );
};

export default PopularList;

const styles = StyleSheet.create({
    converImageContainer: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 16,
        marginHorizontal: 30,
        marginBottom: 0,
    },
    coverImage: {
        width: '100%',
        height: Dimensions.get('screen').width * 0.5,
    },
    movieTitle: {
        color: Colors.white,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
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
