import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import Carousel from 'react-native-snap-carousel';
import { Circle } from 'react-native-progress';
import { AuthData } from '../../../domain/authentication/auth_data';
import { fetchNowPlayingMovies } from '../../../application/movies/now_playing/now_playing_actions';
import { MovieFailure } from '../../../domain/movies/movie_failures';
import { NowPlayingMovie } from '../../../domain/movies/now_playing';
import { useAppDispatch, useAppSelector } from '../../../application/hooks';

const NowPlayingList = () => {
    const { isFetching, pageNumber, movieFailureOrData, tokenExpired } =
        useAppSelector(({ nowPlaying }) => nowPlaying);
    const { isLoggedIn, authFailureOrData } = useAppSelector(
        ({ login }) => login,
    );
    const movieDispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        if (authFailureOrData instanceof AuthData) {
            movieDispatch(
                fetchNowPlayingMovies(authFailureOrData.token.value, 1),
            );
        }
    }, [authFailureOrData, isLoggedIn, movieDispatch]);

    return (
        <>
            {isFetching && <Circle size={50} indeterminate />}
            {movieFailureOrData instanceof MovieFailure ? (
                <View />
            ) : (
                (movieFailureOrData as NowPlayingMovie[]).length > 0 && (
                    <Carousel
                        data={movieFailureOrData}
                        renderItem={({ item }: { item: NowPlayingMovie }) => (
                            <View>
                                <Text>{item.movieTitle.value}</Text>
                            </View>
                        )}
                        sliderWidth={500}
                        itemWidth={200}
                    />
                )
            )}
        </>
    );
};

export default NowPlayingList;
