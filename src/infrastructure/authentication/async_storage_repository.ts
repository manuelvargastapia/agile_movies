import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthData } from '../../domain/authentication/auth_data';
import {
    AuthFailure,
    NoDataStored,
    StorageFailed,
} from '../../domain/authentication/auth_failures';
import { RefreshToken, Token } from '../../domain/core/value_objects';

export async function storeAuthData(
    authData: AuthData,
): Promise<AuthFailure | void> {
    try {
        if (authData.token.isValid()) {
            await AsyncStorage.setItem('@token', authData.token.getOrCrash());
        }

        if (authData.refreshToken.isValid()) {
            await AsyncStorage.setItem(
                '@refresh_token',
                authData.refreshToken.getOrCrash(),
            );
        }
    } catch (error) {
        return new StorageFailed('Error storing authentication tokens');
    }
}

export async function readAuthData(): Promise<AuthFailure | AuthData> {
    try {
        const token = await AsyncStorage.getItem('@token');
        const refreshToken = await AsyncStorage.getItem('@refresh_token');

        if (token === null) {
            return new NoDataStored('There are no tokens');
        }

        const authData = new AuthData(
            new Token(token),
            new RefreshToken(refreshToken),
        );

        return authData;
    } catch (error) {
        return new StorageFailed('Error retrieving autthentication tokens');
    }
}

export async function clearStorage(): Promise<AuthFailure | void> {
    try {
        await AsyncStorage.removeItem('@token');
        await AsyncStorage.removeItem('@refresh_token');
    } catch (error) {
        return new StorageFailed('Error removing data');
    }
}
