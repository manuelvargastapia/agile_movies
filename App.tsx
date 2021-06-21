import React from 'react';
import { Provider } from 'react-redux';
import {
    Provider as PaperProvider,
    DefaultTheme,
    Colors,
} from 'react-native-paper';
import { appStore } from './src/application/store';
import Router from './src/presentation/router/Router';

const App = () => {
    return (
        <Provider store={appStore}>
            {/* We're using react-native-paper as the main style guide */}
            <PaperProvider
                theme={{
                    ...DefaultTheme,
                    colors: {
                        ...DefaultTheme.colors,
                        backdrop: Colors.grey900,
                    },
                }}>
                <Router />
            </PaperProvider>
        </Provider>
    );
};

export default App;
