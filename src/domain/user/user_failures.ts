export abstract class UserFailure extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class ServerError extends UserFailure {}

export class TokenExpired extends UserFailure {}
