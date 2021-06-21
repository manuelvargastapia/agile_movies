import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import { AuthData } from '../../../domain/authentication/auth_data';
import {
    MovieFailure,
    ServerError,
} from '../../../domain/movies/movie_failures';
import { useAppSelector } from '../../../application/hooks';
import { useHistory } from 'react-router-native';
import ErrorMessage from '../../core/components/ErrorMessage';
import Loader from '../../core/components/Loader';
import { Paths } from '../../core/enums/router_paths';
import { popularActions } from '../../../application/movies/movies/movies_slice';
import { fetchPopularMovies } from '../../../application/movies/movies/movies_actions';
import { PopularMovie } from '../../../domain/movies/popular';
import PopularItem from './PopularItem';
import useMovieFetching from '../../core/hooks/useMovieFetching';

const PopularList: React.FC<{ authData: AuthData }> = ({ authData }) => {
    const { colors } = useTheme();
    const history = useHistory();

    // PopularList and NowPlayingList are very similar, so we're using a common
    // custom hook to help to reduce the code duplication
    const { isFetching, movieFailureOrData, dispatch } = useMovieFetching(
        authData,
        useAppSelector(({ popular }) => popular),
        fetchPopularMovies,
    );

    function onSelectMovie(movie: PopularMovie) {
        history.push(Paths.movieDetails, { movie, authData });
    }

    function onEndReached() {
        dispatch(popularActions.incrementPageNumber());
    }

    function renderItem({ item }: { item: PopularMovie }) {
        return (
            <PopularItem
                key={item.movieId.value}
                item={item}
                onSelectItem={onSelectMovie}
            />
        );
    }

    function keyExtractor(_: PopularMovie, index: number) {
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
                <FlatList
                    data={movieFailureOrData}
                    renderItem={renderItem}
                    numColumns={2}
                    onEndReached={onEndReached}
                    ListFooterComponent={listFooterComponent}
                    keyExtractor={keyExtractor}
                />
            )}
        </>
    );
};

export default PopularList;
