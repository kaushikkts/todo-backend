export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: Address;
}

export interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}
