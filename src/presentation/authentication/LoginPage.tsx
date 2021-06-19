import React, { useEffect, useState } from 'react';
import {
    View,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    StyleSheet,
} from 'react-native';
import {
    TextInput,
    Button,
    HelperText,
    Colors,
    useTheme,
} from 'react-native-paper';
import { useHistory } from 'react-router-native';
import { Bar } from 'react-native-progress';
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

const LoginPage = () => {
    // Prevent showing error styles before first submition
    const [validationAllowed, setValidationAllowed] = useState(false);

    const { colors } = useTheme();

    const { isLoggedIn, username, password, isSubmitting, authFailureOrData } =
        useAppSelector(({ login }) => login);

    const dispatch = useAppDispatch();

    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn) {
            history.replace('/movies');
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
        <View style={{ ...styles.container, backgroundColor: colors.backdrop }}>
            <TextInput
                style={styles.textInput}
                onChange={usernameInputHandler}
                label="Usuario"
                left={<TextInput.Icon name="account" />}
                error={
                    validationAllowed && username.value instanceof UsernameEmpty
                }
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
            />
            <Button
                style={styles.button}
                onPress={submitHandler}
                mode="contained">
                Entrar
            </Button>
            {/* Set width to null to use all the available space */}
            {isSubmitting && <Bar progress={0.3} width={null} />}
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
