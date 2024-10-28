export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    address?: Address;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}