import React from 'react';
import { Provider } from 'react-redux';
import { appStore } from './src/application/store';
import SplashPage from './src/presentation/splash/SplashPage';

const App = () => {
    return (
        <Provider store={appStore}>
            <SplashPage />
        </Provider>
    );
};

export default App;
