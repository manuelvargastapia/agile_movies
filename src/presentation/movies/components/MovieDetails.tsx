import React, { useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Colors, Headline, Paragraph, useTheme } from 'react-native-paper';
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
import ErrorMessage from '../../core/components/ErrorMessage';
import Loader from '../../core/components/Loader';
import SnapCarousel from '../../core/components/SnapCarousel';
import ActorItem from './ActorItem';
import Header from './Header';

const MovieDetails = () => {
    const { colors } = useTheme();

    // Extracting the state coming from MoviesPage
    const { state } = useLocation<{ movie: IMovie; authData: AuthData }>();
    const { movieId, movieCoverUrl, movieTitle, movieOverview } = state.movie;
    const { token, refreshToken } = state.authData;

    const dispatch = useAppDispatch();
    const { userFailureOrData } = useAppSelector(({ userInfo }) => userInfo);
    const { isFetching, actorFailureOrData, tokenExpired } = useAppSelector(
        ({ actors }) => actors,
    );

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(refreshToken));
        }
    }, [refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        // Prevent showing previous data
        dispatch(actorsActions.clearActors());
        dispatch(fetchMovieActors(token, movieId.value));
    }, [token, dispatch, movieId.value]);

    function renderItem(item: Actor, index: number) {
        return <ActorItem key={index} item={item} />;
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
                        <ErrorMessage
                            visible={actorFailureOrData instanceof ServerError}
                            message={actorFailureOrData.message}
                        />
                    ) : (
                        <SnapCarousel
                            data={actorFailureOrData}
                            renderItem={renderItem}
                        />
                    )}

                    <Loader color={colors.accent} visible={isFetching} />
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
    },
    movieCoverImage: {
        height: Dimensions.get('screen').height * 0.3,
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
        paddingHorizontal: 16,
    },
    cast: {
        color: Colors.white,
        paddingBottom: 16,
        fontSize: 20,
    },
});
