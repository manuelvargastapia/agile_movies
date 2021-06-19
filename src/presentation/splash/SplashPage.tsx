import React, { useEffect } from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle } from 'react-native-progress';
import { loginWithStoredToken } from '../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import Router from '../router/Router';

const SplashPage = () => {
    // This is needed because isSubmitting is initially false, so we
    // needa way of skipping the first render when evaluating it
    const firstRender = useRef<boolean>(true);

    const { isSubmitting } = useAppSelector(({ login }) => login);

    const dispatch = useAppDispatch();

    useEffect(() => {
        firstRender.current = false;
        dispatch(loginWithStoredToken());
    }, [dispatch]);

    return (
        <>
            {firstRender.current || isSubmitting ? (
                <View style={styles.container}>
                    <Circle size={50} indeterminate />
                </View>
            ) : (
                <Router />
            )}
        </>
    );
};

export default SplashPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
