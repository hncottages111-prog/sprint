// Authentication Service - manages user login/logout and authentication state
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Customer, CustomerLogin, CustomerRegistration } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Sample customer data - in a real app, this would be in a database
  private customers: Customer[] = [
    {
      customerId: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phoneNumber: '555-0123',
      password: 'password123'
    },
    {
      customerId: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phoneNumber: '555-0456',
      password: 'password456'
    },
    {
      customerId: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phoneNumber: '555-0789',
      password: 'password789'
    }
  ];

  private currentUser: Customer | null = null;

  constructor() {
    // Check if user was logged in previously (stored in browser storage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  // Register a new customer
  register(registration: CustomerRegistration): Observable<{ success: boolean; message: string }> {
    // Check if email already exists
    const existingCustomer = this.customers.find(c => c.email === registration.email);
    if (existingCustomer) {
      return of({ 
        success: false, 
        message: 'Email already registered. Please use a different email.' 
      }).pipe(delay(300));
    }

    // Create new customer
    const newCustomer: Customer = {
      customerId: this.customers.length + 1,
      name: registration.name,
      email: registration.email,
      phoneNumber: registration.phoneNumber,
      password: registration.password
    };

    // Add to our customer list
    this.customers.push(newCustomer);

    return of({ 
      success: true, 
      message: 'Registration successful! Please log in.' 
    }).pipe(delay(500));
  }

  // Login with email and password
  login(credentials: CustomerLogin): Observable<{ success: boolean; message: string; customer?: Customer }> {
    // Find customer with matching email and password
    const customer = this.customers.find(c => 
      c.email === credentials.email && c.password === credentials.password
    );

    if (customer) {
      // Login successful - save user info
      this.currentUser = customer;
      localStorage.setItem('currentUser', JSON.stringify(customer));
      
      return of({ 
        success: true, 
        message: 'Login successful!',
        customer: customer 
      }).pipe(delay(300));
    } else {
      return of({ 
        success: false, 
        message: 'Invalid email or password. Please try again.' 
      }).pipe(delay(300));
    }
  }

  // Logout current user
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // Check if user is currently logged in
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Get current logged in user
  getCurrentUser(): Customer | null {
    return this.currentUser;
  }

  // Get current user ID (useful for making bookings)
  getCurrentUserId(): number | null {
    return this.currentUser ? this.currentUser.customerId : null;
  }
}