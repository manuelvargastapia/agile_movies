import React, { useEffect, useState } from 'react';
import { Appbar, Menu, useTheme } from 'react-native-paper';
import {
    loginWithRefreshToken,
    logout,
} from '../../../application/authentication/login/login_actions';
import { useAppDispatch, useAppSelector } from '../../../application/hooks';
import { fetchUserInfo } from '../../../application/user/user_info/info_actions';
import { AuthData } from '../../../domain/authentication/auth_data';
import { User } from '../../../domain/user/user';

const Header: React.FC<{ authData: AuthData }> = ({ authData }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const { colors } = useTheme();

    const { tokenExpired, userFailureOrData } = useAppSelector(
        ({ userInfo }) => userInfo,
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenExpired) {
            dispatch(loginWithRefreshToken(authData.refreshToken));
        }
    }, [authData.refreshToken, dispatch, tokenExpired]);

    useEffect(() => {
        dispatch(fetchUserInfo(authData.token));
    }, [authData.token, dispatch]);

    function logoutHandler() {
        dispatch(logout());
    }

    function closeMenu() {
        setIsMenuVisible(false);
    }

    function openMenu() {
        setIsMenuVisible(true);
    }

    return (
        <Appbar.Header style={{ backgroundColor: colors.placeholder }}>
            <Appbar.Content title="AgileMovies" />
            <Menu
                visible={isMenuVisible}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action
                        icon="dots-vertical"
                        color={colors.surface}
                        onPress={openMenu}
                    />
                }>
                {userFailureOrData instanceof User && (
                    <Menu.Item
                        title={`Hola ${userFailureOrData.firstName.value} ${userFailureOrData.lastName.value}`}
                    />
                )}
                <Menu.Item
                    title="Salir"
                    icon="logout"
                    onPress={logoutHandler}
                />
            </Menu>
        </Appbar.Header>
    );
};

export default Header;
