import React, { useEffect } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import { useHistory } from 'react-router-native';
import { Bar } from 'react-native-progress';
import { loginWithCredentials } from '../../application/authentication/login/login_actions';
import { loginActions } from '../../application/authentication/login/login_slice';
import { AuthFailure } from '../../domain/authentication/auth_failures';
import { useAppDispatch, useAppSelector } from '../../application/hooks';

const LoginPage = () => {
    const { isLoggedIn, username, password, isSubmitting, authFailureOrData } =
        useAppSelector(({ login }) => login);
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn) {
            history.replace('/movies');
        }
    }, [history, isLoggedIn]);

    return (
        <View>
            <TextInput
                onChange={(
                    event: NativeSyntheticEvent<TextInputChangeEventData>,
                ) => {
                    dispatch(
                        loginActions.usernameChanged(event.nativeEvent.text),
                    );
                }}
            />
            <TextInput
                onChange={(
                    event: NativeSyntheticEvent<TextInputChangeEventData>,
                ) => {
                    dispatch(
                        loginActions.passwordChanged(event.nativeEvent.text),
                    );
                }}
            />
            <Button
                title="LOGIN"
                onPress={() => {
                    dispatch(
                        loginWithCredentials(username.value, password.value),
                    );
                }}
            />
            {authFailureOrData instanceof AuthFailure && (
                <Text>{authFailureOrData.message}</Text>
            )}
            {isSubmitting && <Bar progress={0.3} width={200} />}
        </View>
    );
};

export default LoginPage;
