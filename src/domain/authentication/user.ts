import { EmailAddress, Username, Firstname, Lastname } from './value_objects';

export class User {
    username: Username;
    emailAddress: EmailAddress;
    firstName: Firstname;
    lastName: Lastname;

    constructor(
        username: Username,
        emailAddress: EmailAddress,
        firstName: Firstname,
        lastName: Lastname,
    ) {
        this.username = username;
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
