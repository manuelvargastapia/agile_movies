import React from 'react';
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
import SnapCarousel from '../../core/components/SnapCarousel';

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

    function renderItem(item: NowPlayingMovie, _: number) {
        return (
            <NowPlayingItem
                key={item.movieId.value}
                item={item}
                onSelectItem={onSelectMovie}
            />
        );
    }

    const ListFooterComponent = (
        <Loader color={colors.accent} visible={isFetching} />
    );

    return (
        <>
            {movieFailureOrData instanceof MovieFailure ? (
                <ErrorMessage
                    visible={movieFailureOrData instanceof ServerError}
                    message={movieFailureOrData.message}
                />
            ) : (
                <>
                    {isFetching &&
                        movieFailureOrData.length === 0 &&
                        ListFooterComponent}
                    {movieFailureOrData.length > 0 && (
                        <SnapCarousel
                            data={movieFailureOrData}
                            renderItem={renderItem}
                            onEndReached={onEndReached}
                            ListFooterComponent={ListFooterComponent}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default NowPlayingList;
