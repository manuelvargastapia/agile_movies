import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { appStore } from './src/application/store';
import Router from './src/presentation/router/Router';

const App = () => {
    return (
        <Provider store={appStore}>
            <PaperProvider
                theme={{
                    ...DefaultTheme,
                    dark: true,
                }}>
                <Router />
            </PaperProvider>
        </Provider>
    );
};

export default App;
