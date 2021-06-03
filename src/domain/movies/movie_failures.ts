export abstract class MovieFailure extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class ServerError extends MovieFailure {}

export class TokenExpired extends MovieFailure {}
