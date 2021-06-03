abstract class ValueObject<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}

export class EmailAddress implements ValueObject<string> {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class Username implements ValueObject<string> {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class Password implements ValueObject<string> {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class Firstname implements ValueObject<string> {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class Lastname implements ValueObject<string> {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class Token implements ValueObject<string> {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}

export class RefreshToken implements ValueObject<string> {
    value: string;

    constructor(value: string) {
        this.value = value;
    }
}
