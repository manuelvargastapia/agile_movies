import { RefreshToken, Token } from '../core/value_objects';

export class AuthData {
    token: Token;
    refreshToken: RefreshToken;

    constructor(token: Token, refreshToken: RefreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
