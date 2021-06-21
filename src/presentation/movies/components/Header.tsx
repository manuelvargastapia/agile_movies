import React, { useState } from 'react';
import { Appbar, Colors, Menu, useTheme } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import { logout } from '../../../application/authentication/login/login_actions';
import { useAppDispatch } from '../../../application/hooks';
import { User } from '../../../domain/user/user';
import { UserFailure } from '../../../domain/user/user_failures';

const Header: React.FC<{
    userFailureOrData: UserFailure | User;
    title: string;
    backAction?: boolean;
}> = ({ userFailureOrData, title, backAction = false }) => {
    const { colors } = useTheme();
    const history = useHistory();

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const dispatch = useAppDispatch();

    function logoutHandler() {
        dispatch(logout());
    }

    function closeMenu() {
        setIsMenuVisible(false);
    }

    function openMenu() {
        setIsMenuVisible(true);
    }

    function goBack() {
        history.goBack();
    }

    return (
        <Appbar.Header style={{ backgroundColor: colors.placeholder }}>
            {backAction && <Appbar.BackAction onPress={goBack} />}

            <Appbar.Content title={title} />

            <Menu
                visible={isMenuVisible}
                onDismiss={closeMenu}
                anchor={
                    <Appbar.Action
                        icon="dots-vertical"
                        color={Colors.white}
                        onPress={openMenu}
                    />
                }>
                {/* If request fails, we simply don't show the user's info */}
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
