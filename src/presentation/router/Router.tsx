import React, { useEffect, useRef } from 'react';
import { NativeRouter, Redirect, Route, Switch } from 'react-router-native';
import { loginWithStoredToken } from '../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import LoginPage from '../authentication/LoginPage';
import MovieDetails from '../movies/components/MovieDetails';
import MoviesPage from '../movies/MoviesPage';

const Router = () => {
    // This is needed because isSubmitting is initially false, so we
    // needa way of skipping the first render when evaluating it
    const firstRender = useRef(true);

    const { isLoggedIn, isSubmitting } = useAppSelector(({ login }) => login);

    const dispatch = useAppDispatch();

    useEffect(() => {
        firstRender.current = false;
        dispatch(loginWithStoredToken());
    }, [dispatch]);

    return (
        <NativeRouter>
            {!firstRender.current && !isSubmitting && (
                <Route exact path="*">
                    {isLoggedIn ? (
                        <Redirect to="/movies" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
            )}
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route exact path="/movies" component={MoviesPage} />
                <Route path="/movies/details" component={MovieDetails} />
            </Switch>
        </NativeRouter>
    );
};

export default Router;
