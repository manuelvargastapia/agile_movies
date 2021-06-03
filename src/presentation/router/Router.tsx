import React from 'react';
import { NativeRouter, Route } from 'react-router-native';
import LoginPage from '../authentication/LoginPage';
import MoviesPage from '../movies/MoviesPage';

const Router = () => {
    return (
        <NativeRouter>
            <Route exact path="/" component={LoginPage} />
            <Route path="/movies" component={MoviesPage} />
        </NativeRouter>
    );
};

export default Router;
