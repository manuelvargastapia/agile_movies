import React from 'react';
import { NativeRouter, Redirect, Route } from 'react-router-native';
import LoginPage from '../authentication/LoginPage';
import MoviesPage from '../movies/MoviesPage';

const Router = () => {
    return (
        <NativeRouter>
            {/* /movies is the first page that checks the authentication
            state and either loads the content or redirects to /login */}
            <Route exact path="/">
                <Redirect to="/movies" />
            </Route>
            <Route path="/movies" component={MoviesPage} />
            <Route path="/login" component={LoginPage} />
        </NativeRouter>
    );
};

export default Router;
