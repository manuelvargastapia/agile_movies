import React, { useEffect, useState } from 'react';
import {
    View,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    StyleSheet,
    Image,
} from 'react-native';
import {
    TextInput,
    Button,
    useTheme,
    ProgressBar,
    HelperText,
    Colors,
} from 'react-native-paper';
import { useHistory } from 'react-router-native';
import { loginWithCredentials } from '../../application/authentication/login/login_actions';
import { loginActions } from '../../application/authentication/login/login_slice';
import {
    AuthFailure,
    InvalidCredentials,
    ServerError,
    StorageFailed,
} from '../../domain/authentication/auth_failures';
import { useAppDispatch, useAppSelector } from '../../application/hooks';
import { PasswordEmpty, UsernameEmpty } from '../../domain/core/value_failures';
import { Paths } from '../core/enums/router_paths';

const LoginPage = () => {
    const { colors } = useTheme();
    const history = useHistory();

    // Prevent showing error styles in TextInput's before first submition
    const [validationAllowed, setValidationAllowed] = useState(false);

    const dispatch = useAppDispatch();
    const { isLoggedIn, username, password, isSubmitting, authFailureOrData } =
        useAppSelector(({ login }) => login);

    useEffect(() => {
        if (isLoggedIn) {
            history.replace(Paths.movies);
        }
    }, [history, isLoggedIn]);

    function usernameInputHandler(
        event: NativeSyntheticEvent<TextInputChangeEventData>,
    ) {
        dispatch(loginActions.usernameChanged(event.nativeEvent.text));
    }

    function passwordInputHandler(
        event: NativeSyntheticEvent<TextInputChangeEventData>,
    ) {
        dispatch(loginActions.passwordChanged(event.nativeEvent.text));
    }

    function submitHandler() {
        setValidationAllowed(true);

        if (username.isValid() && password.isValid()) {
            dispatch(
                loginWithCredentials(
                    username.getOrCrash(),
                    password.getOrCrash(),
                ),
            );
        }
    }

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.backdrop,
            }}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                />
            </View>

            <TextInput
                style={styles.textInput}
                onChange={usernameInputHandler}
                label="Usuario"
                left={<TextInput.Icon name="account" />}
                error={
                    validationAllowed && username.value instanceof UsernameEmpty
                }
                returnKeyType="next"
            />
            <TextInput
                style={styles.textInput}
                onChange={passwordInputHandler}
                label="Contraseña"
                left={<TextInput.Icon name="lock" />}
                secureTextEntry
                error={
                    validationAllowed && password.value instanceof PasswordEmpty
                }
                returnKeyType="done"
            />
            <Button
                style={styles.button}
                onPress={submitHandler}
                mode="contained">
                Entrar
            </Button>

            {isSubmitting && <ProgressBar progress={0.3} />}

            {authFailureOrData instanceof AuthFailure && (
                <HelperText
                    style={styles.helperText}
                    type="error"
                    // Show only relevant messages
                    visible={
                        authFailureOrData instanceof ServerError ||
                        authFailureOrData instanceof InvalidCredentials ||
                        authFailureOrData instanceof StorageFailed
                    }
                    padding="none">
                    {authFailureOrData.message}
                </HelperText>
            )}
        </View>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        marginBottom: 64,
    },
    textInput: {
        marginVertical: 8,
    },
    button: {
        marginVertical: 16,
    },
    helperText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
    },
});
