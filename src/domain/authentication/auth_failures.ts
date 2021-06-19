export abstract class AuthFailure extends Error {
    statusCode?: number;
    message: string;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}

export class ServerError extends AuthFailure {}

export class InvalidCredentials extends AuthFailure {}

export class TokenExpired extends AuthFailure {}

export class StorageFailed extends AuthFailure {}

export class NoDataStored extends AuthFailure {}
