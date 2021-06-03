import React from 'react';
import { Provider } from 'react-redux';
import { appStore } from './src/application/store';
import Router from './src/presentation/router/Router';

const App = () => {
    return (
        <Provider store={appStore}>
            <Router />
        </Provider>
    );
};

export default App;
