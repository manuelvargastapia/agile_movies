import {
    MissingRefreshToken,
    MissingToken,
    PasswordEmpty,
    UsernameEmpty,
    ValueFailure,
} from './value_failures';

abstract class ValueObject<T> {
    value: ValueFailure | T;

    constructor(value: ValueFailure | T) {
        this.value = value;
    }

    isValid(): boolean {
        return !(this.value instanceof ValueFailure);
    }

    // Helper function that comes in handy when the value
    // might be logically valid, according to context, but
    // it's still required to "unwrap" it before using it
    getOrCrash(): T {
        if (this.value instanceof ValueFailure) {
            throw new Error('Unexpected error!');
        } else {
            return this.value;
        }
    }
}

export class EmailAddress extends ValueObject<string> {
    value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }
}

export class Username extends ValueObject<string> {
    value: string | ValueFailure;

    constructor(value: string) {
        if (value.trim() === '') {
            super(new UsernameEmpty());
            this.value = new UsernameEmpty();
            return;
        }

        super(value);
        this.value = value;
    }
}

export class Password extends ValueObject<string> {
    value: string | ValueFailure;

    constructor(value: string) {
        if (value.trim() === '') {
            super(value);
            this.value = new PasswordEmpty();
            return;
        }

        super(value);
        this.value = value;
    }
}

export class Firstname extends ValueObject<string> {
    value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }
}

export class Lastname extends ValueObject<string> {
    value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }
}

export class Token extends ValueObject<string> {
    value: string | ValueFailure;

    constructor(value: null | string) {
        if (typeof value === 'string') {
            super(value);
            this.value = value;
            return;
        }
        super(new MissingToken());
        this.value = new MissingToken();
    }
}

export class RefreshToken extends ValueObject<string> {
    value: string | ValueFailure;

    constructor(value: null | string) {
        if (typeof value === 'string') {
            super(value);
            this.value = value;
            return;
        }
        super(new MissingRefreshToken());
        this.value = new MissingRefreshToken();
    }
}

export class MovieBannerUrl extends ValueObject<string> {
    value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }
}

export class MovieCoverUrl extends ValueObject<string> {
    value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }
}

export class MovieId extends ValueObject<number> {
    value: number;

    constructor(value: number) {
        super(value);
        this.value = value;
    }
}
export class MovieTitle extends ValueObject<string> {
    value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }
}
export class MovieOverview extends ValueObject<string> {
    value: string;

    constructor(value: string) {
        super(value);
        this.value = value;
    }
}
