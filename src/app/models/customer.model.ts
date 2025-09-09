// Customer data models - defines customer information and forms

// Basic customer information
export interface Customer {
  customerId: number;
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;  // Optional because we don't always need to send password
}

// Information needed when a new customer registers
export interface CustomerRegistration {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// Information needed when customer logs in
export interface CustomerLogin {
  email: string;
  password: string;
}