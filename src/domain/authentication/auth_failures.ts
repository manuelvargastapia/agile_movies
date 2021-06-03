export class AuthFailure extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class ServerError extends AuthFailure {}

export class InvalidCredentials extends AuthFailure {}

export class TokenExpired extends AuthFailure {}
