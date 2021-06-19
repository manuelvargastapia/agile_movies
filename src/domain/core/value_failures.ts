export abstract class ValueFailure {}

export class MissingToken extends ValueFailure {}

export class MissingRefreshToken extends ValueFailure {}

export class UsernameEmpty extends ValueFailure {}

export class PasswordEmpty extends ValueFailure {}
