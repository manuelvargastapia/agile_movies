import { useEffect } from 'react';
import { loginWithRefreshToken } from '../../../application/authentication/login/login_actions';
import { useAppDispatch } from '../../../application/hooks';
import { MovieFetchAction } from '../../../application/movies/movies/movies_actions';
import { MoviesState } from '../../../application/movies/movies/movies_state';
import { AuthData } from '../../../domain/authentication/auth_data';

// Custom hook to handle API request in movies related pages
const useMovieFetching = (
    authData: AuthData,
    moviesState: MoviesState,
    movieFetchAction: MovieFetchAction,
) => {
    const dispatch = useAppDispatch();
    const {
        isFetching,
        pageNumber,
        lastPageNumber,
        movieFailureOrData,
        tokenExpired,
    } = moviesState;

    const fetchingAllowed = pageNumber !== lastPageNumber;

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(authData.refreshToken));
        }
    }, [authData.refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        if (fetchingAllowed) {
            dispatch(movieFetchAction(authData.token, pageNumber));
        }
    }, [
        authData.token,
        dispatch,
        fetchingAllowed,
        movieFetchAction,
        pageNumber,
    ]);

    return { isFetching, movieFailureOrData, dispatch };
};

export default useMovieFetching;
