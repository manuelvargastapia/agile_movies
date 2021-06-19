export abstract class ValueFailure<T> {
    failedValue?: T;

    constructor(failedValue?: T) {
        this.failedValue = failedValue;
    }
}

export class MissingToken implements ValueFailure<void> {}

export class MissingRefreshToken implements ValueFailure<void> {}
