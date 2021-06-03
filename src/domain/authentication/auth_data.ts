import { RefreshToken, Token } from './value_objects';

export class AuthData {
    token: Token;
    refreshToken?: RefreshToken;

    constructor(token: Token, refreshToken?: RefreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
