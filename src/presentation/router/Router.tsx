import React, { useEffect, useRef } from 'react';
import { NativeRouter, Redirect, Route, Switch } from 'react-router-native';
import { loginWithStoredToken } from '../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import LoginPage from '../authentication/LoginPage';
import { Paths } from '../core/enums/router_paths';
import MovieDetails from '../movies/components/MovieDetails';
import MoviesPage from '../movies/MoviesPage';

const Router = () => {
    // We dispatch a login action (loginWithStoredToken()) using
    // the data stored locally (AsyncStorage). To avoid redirecting
    // twice (before and after this check), we keep track of the first
    // render with useRef(). Only after checking the authentication
    // status, the Router decides which page redirect to.
    const firstRender = useRef(true);

    const dispatch = useAppDispatch();
    const { isLoggedIn, isSubmitting } = useAppSelector(({ login }) => login);

    useEffect(() => {
        firstRender.current = false;
        dispatch(loginWithStoredToken());
    }, [dispatch]);

    return (
        <NativeRouter>
            {/* Decide which page redirect to when opening the app */}
            {!firstRender.current && !isSubmitting && (
                <Route exact path="*">
                    {isLoggedIn ? (
                        <Redirect to={Paths.movies} />
                    ) : (
                        <Redirect to={Paths.login} />
                    )}
                </Route>
            )}

            {/* <Switch> allows us to render one of the pages exclusively */}
            <Switch>
                <Route path={Paths.login} component={LoginPage} />
                <Route exact path={Paths.movies} component={MoviesPage} />
                <Route path={Paths.movieDetails} component={MovieDetails} />
            </Switch>
        </NativeRouter>
    );
};

export default Router;
