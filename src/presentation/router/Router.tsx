import React from 'react';
import { NativeRouter, Redirect, Route } from 'react-router-native';
import { useAppSelector } from '../../application/hooks';
import LoginPage from '../authentication/LoginPage';
import MoviesPage from '../movies/MoviesPage';

const Router = () => {
    const { isLoggedIn } = useAppSelector(({ login }) => login);

    return (
        <NativeRouter>
            <Route exact path="/">
                {isLoggedIn ? (
                    <Redirect to="/movies" />
                ) : (
                    <Redirect to="/login" />
                )}
            </Route>
            <Route path="/movies" component={MoviesPage} />
            <Route path="/login" component={LoginPage} />
        </NativeRouter>
    );
};

export default Router;
