import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useTheme } from 'react-native-paper';
import { AuthData } from '../../../domain/authentication/auth_data';
import {
    MovieFailure,
    ServerError,
} from '../../../domain/movies/movie_failures';
import { NowPlayingMovie } from '../../../domain/movies/now_playing';
import NowPlayingItem from './NowPlayingItem';
import { useHistory } from 'react-router-native';
import ErrorMessage from '../../core/components/ErrorMessage';
import Loader from '../../core/components/Loader';
import { Paths } from '../../core/enums/router_paths';
import { nowPlayingActions } from '../../../application/movies/movies/movies_slice';
import useMovieFetching from '../../core/hooks/useMovieFetching';
import { useAppSelector } from '../../../application/hooks';
import { fetchNowPlayingMovies } from '../../../application/movies/movies/movies_actions';

const screenWidth = Dimensions.get('screen').width;

const NowPlayingList: React.FC<{ authData: AuthData }> = ({ authData }) => {
    const { colors } = useTheme();
    const history = useHistory();

    // PopularList and NowPlayingList are very similar, so we're using a common
    // custom hook to help to reduce the code duplication
    const { isFetching, movieFailureOrData, dispatch } = useMovieFetching(
        authData,
        useAppSelector(({ nowPlaying }) => nowPlaying),
        fetchNowPlayingMovies,
    );

    function onSelectMovie(movie: NowPlayingMovie) {
        history.push(Paths.movieDetails, { movie, authData });
    }

    function onEndReached() {
        dispatch(nowPlayingActions.incrementPageNumber());
    }

    function renderItem({ item }: { item: NowPlayingMovie }) {
        return (
            <NowPlayingItem
                key={item.movieId.value}
                item={item}
                onSelectItem={onSelectMovie}
            />
        );
    }

    function keyExtractor(_: NowPlayingMovie, index: number) {
        return index.toString();
    }

    function listFooterComponent() {
        return <Loader color={colors.accent} visible={isFetching} />;
    }

    return (
        <>
            {movieFailureOrData instanceof MovieFailure ? (
                <ErrorMessage
                    visible={movieFailureOrData instanceof ServerError}
                    message={movieFailureOrData.message}
                />
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
