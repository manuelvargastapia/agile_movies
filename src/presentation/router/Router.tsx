import React, { useEffect, useRef } from 'react';
import { NativeRouter, Redirect, Route } from 'react-router-native';
import { loginWithStoredToken } from '../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import LoginPage from '../authentication/LoginPage';
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
                <Route exact path="/">
                    {isLoggedIn ? (
                        <Redirect to="/movies" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>
            )}
            <Route path="/movies" component={MoviesPage} />
            <Route path="/login" component={LoginPage} />
        </NativeRouter>
    );
};

export default Router;
