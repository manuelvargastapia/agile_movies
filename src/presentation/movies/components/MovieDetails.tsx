import React, { useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
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
import { actorsActions } from '../../../application/movies/actors/actors_slice';
import { AuthData } from '../../../domain/authentication/auth_data';
import { Actor } from '../../../domain/movies/actor';
import { IMovie } from '../../../domain/movies/i_movie';
import {
    MovieFailure,
    ServerError,
} from '../../../domain/movies/movie_failures';
import ActorItem from './ActorItem';
import Header from './Header';

const screenWidth = Dimensions.get('screen').width;

const MovieDetails = () => {
    const { colors } = useTheme();

    const { state } = useLocation<{ movie: IMovie; authData: AuthData }>();

    const { movieId, movieCoverUrl, movieTitle, movieOverview } = state.movie;

    const { token, refreshToken } = state.authData;

    const { userFailureOrData } = useAppSelector(({ userInfo }) => userInfo);

    const { isFetching, actorFailureOrData, tokenExpired } = useAppSelector(
        ({ actors }) => actors,
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(refreshToken));
        }
    }, [refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        // Prevent showing temporary previous data
        dispatch(actorsActions.clearActors());
        dispatch(fetchMovieActors(token, movieId.value));
    }, [token, dispatch, movieId.value]);

    function renderItem({ item }: { item: Actor }) {
        return <ActorItem key={item.name} item={item} />;
    }

    function keyExtractor(_: Actor, index: number) {
        return index.toString();
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
                        <Carousel
                            data={actorFailureOrData}
                            renderItem={renderItem}
                            sliderWidth={screenWidth}
                            itemWidth={screenWidth / 2}
                            inactiveSlideOpacity={0.4}
                            keyExtractor={keyExtractor}
                            enableMomentum
                            decelerationRate={0.9}
                        />
                    )}
                    {isFetching && (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator
                                size={50}
                                animating={true}
                                color={colors.accent}
                            />
                        </View>
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
});
