import React, { useEffect } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Colors,
    Headline,
    HelperText,
    Paragraph,
    useTheme,
} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { useLocation } from 'react-router-native';
import { loginWithRefreshToken } from '../../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../../application/hooks';
import { fetchMovieActors } from '../../../application/movies/actors/actors_actions';
import { AuthData } from '../../../domain/authentication/auth_data';
import { Actor } from '../../../domain/movies/actor';
import { IMovie } from '../../../domain/movies/i_movie';
import {
    MovieFailure,
    ServerError,
} from '../../../domain/movies/movie_failures';
import Header from './Header';

const screenWidth = Dimensions.get('screen').width;

const MovieDetails = () => {
    const { colors } = useTheme();

    const { state } = useLocation<{ movie: IMovie; authData: AuthData }>();

    const {
        movieId,
        movieCoverUrl,
        movieBannerUrl,
        movieTitle,
        movieOverview,
    } = state.movie;

    const { token, refreshToken } = state.authData;

    const { userFailureOrData } = useAppSelector(({ userInfo }) => userInfo);

    const { actorFailureOrData, tokenExpired } = useAppSelector(
        ({ actors }) => actors,
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(refreshToken));
        }
    }, [refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        dispatch(fetchMovieActors(token, movieId.value));
    }, [token, dispatch, movieId.value]);

    function renderItem({ item }: { item: Actor }) {
        return (
            <View style={styles.actorPictureContainer}>
                <Image
                    style={styles.actorPicture}
                    resizeMode="contain"
                    source={{
                        uri: item.profileImageUrl,
                    }}
                />
                <Text style={styles.actorName}>{item.name}</Text>
            </View>
        );
    }

    return (
        <>
            <Header
                userFailureOrData={userFailureOrData}
                title={movieTitle.value}
                backAction
            />
            <ScrollView style={{ backgroundColor: colors.backdrop }}>
                <Image
                    style={styles.movieCoverImage}
                    resizeMode="cover"
                    source={{ uri: movieCoverUrl.value }}
                />
                <View style={styles.contentContainer}>
                    <Headline style={styles.title}>{movieTitle.value}</Headline>
                    {/* <Image
                        style={styles.movieBannerImage}
                        resizeMode="contain"
                        source={{ uri: movieBannerUrl.value }}
                    /> */}
                    <Paragraph style={styles.paragraph}>
                        {movieOverview.value}
                    </Paragraph>
                    <Headline style={styles.cast}>Reparto</Headline>
                    {actorFailureOrData instanceof MovieFailure ? (
                        <View style={styles.helperTextContainer}>
                            <HelperText
                                style={styles.helperText}
                                type="error"
                                visible={
                                    actorFailureOrData instanceof ServerError
                                }
                                padding="none">
                                {actorFailureOrData.message}
                            </HelperText>
                        </View>
                    ) : (
                        actorFailureOrData.length > 0 && (
                            <Carousel
                                data={actorFailureOrData}
                                renderItem={renderItem}
                                sliderWidth={screenWidth}
                                itemWidth={screenWidth / 2}
                                keyExtractor={(_, index) => index.toString()}
                            />
                        )
                    )}
                </View>
            </ScrollView>
        </>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    movieCoverImage: {
        height: Dimensions.get('screen').height * 0.3,
    },
    movieBannerImage: {
        width: screenWidth * 0.3,
        height: Dimensions.get('screen').height * 0.3,
    },
    overview: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        color: Colors.white,
        textAlign: 'center',
        paddingBottom: 16,
    },
    paragraph: {
        color: Colors.white,
        textAlign: 'justify',
        fontSize: 16,
        paddingBottom: 16,
    },
    cast: {
        color: Colors.white,
        paddingBottom: 16,
        fontSize: 20,
    },
    actorPictureContainer: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 16,
        marginHorizontal: 30,
        marginBottom: 0,
    },
    actorPicture: {
        width: '100%',
        height: screenWidth * 0.5,
    },
    actorName: {
        color: Colors.white,
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
