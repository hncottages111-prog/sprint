// Customer Registration Component - allows new users to create accounts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snackbar';

import { CustomerRegistration } from '../../models/customer.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div style="max-width: 500px; margin: 0 auto;">
      <mat-card style="padding: 30px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <mat-icon style="font-size: 48px; color: #1976d2;">person_add</mat-icon>
          <h2 style="margin: 10px 0;">Create Account</h2>
          <p style="color: #666;">Join us to book train tickets easily</p>
        </div>

        <!-- Registration Form -->
        <form #registerForm="ngForm" (ngSubmit)="onSubmit(registerForm)">
          <!-- Full Name Field -->
          <mat-form-field class="full-width" style="margin-bottom: 15px;">
            <mat-label>Full Name</mat-label>
            <input matInput 
                   name="name"
                   [(ngModel)]="registration.name"
                   #name="ngModel"
                   required
                   minlength="2"
                   maxlength="50"
                   placeholder="Enter your full name">
            <mat-icon matSuffix>person</mat-icon>
            
            <!-- Show error messages -->
            <mat-error *ngIf="name.invalid && (name.dirty || name.touched)">
              <span *ngIf="name.errors?.['required']">Full name is required</span>
              <span *ngIf="name.errors?.['minlength']">Name must be at least 2 characters</span>
              <span *ngIf="name.errors?.['maxlength']">Name cannot exceed 50 characters</span>
            </mat-error>
          </mat-form-field>

          <!-- Email Field -->
          <mat-form-field class="full-width" style="margin-bottom: 15px;">
            <mat-label>Email Address</mat-label>
            <input matInput 
                   type="email"
                   name="email"
                   [(ngModel)]="registration.email"
                   #email="ngModel"
                   required
                   email
                   placeholder="Enter your email address">
            <mat-icon matSuffix>email</mat-icon>
            
            <!-- Show error messages -->
            <mat-error *ngIf="email.invalid && (email.dirty || email.touched)">
              <span *ngIf="email.errors?.['required']">Email is required</span>
              <span *ngIf="email.errors?.['email']">Please enter a valid email address</span>
            </mat-error>
          </mat-form-field>

          <!-- Phone Number Field -->
          <mat-form-field class="full-width" style="margin-bottom: 15px;">
            <mat-label>Phone Number</mat-label>
            <input matInput 
                   type="tel"
                   name="phoneNumber"
                   [(ngModel)]="registration.phoneNumber"
                   #phone="ngModel"
                   required
                   pattern="[0-9]{3}-[0-9]{4}"
                   placeholder="555-1234">
            <mat-icon matSuffix>phone</mat-icon>
            
            <!-- Show error messages -->
            <mat-error *ngIf="phone.invalid && (phone.dirty || phone.touched)">
              <span *ngIf="phone.errors?.['required']">Phone number is required</span>
              <span *ngIf="phone.errors?.['pattern']">Please use format: 555-1234</span>
            </mat-error>
          </mat-form-field>

          <!-- Password Field -->
          <mat-form-field class="full-width" style="margin-bottom: 15px;">
            <mat-label>Password</mat-label>
            <input matInput 
                   [type]="hidePassword ? 'password' : 'text'"
                   name="password"
                   [(ngModel)]="registration.password"
                   #password="ngModel"
                   required
                   minlength="6"
                   placeholder="Enter a secure password">
            <mat-icon matSuffix (click)="hidePassword = !hidePassword" style="cursor: pointer;">
              {{ hidePassword ? 'visibility' : 'visibility_off' }}
            </mat-icon>
            
            <!-- Show error messages -->
            <mat-error *ngIf="password.invalid && (password.dirty || password.touched)">
              <span *ngIf="password.errors?.['required']">Password is required</span>
              <span *ngIf="password.errors?.['minlength']">Password must be at least 6 characters</span>
            </mat-error>
          </mat-form-field>

          <!-- Confirm Password Field -->
          <mat-form-field class="full-width" style="margin-bottom: 25px;">
            <mat-label>Confirm Password</mat-label>
            <input matInput 
                   [type]="hideConfirmPassword ? 'password' : 'text'"
                   name="confirmPassword"
                   [(ngModel)]="confirmPassword"
                   #confirmPwd="ngModel"
                   required
                   placeholder="Re-enter your password">
            <mat-icon matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" style="cursor: pointer;">
              {{ hideConfirmPassword ? 'visibility' : 'visibility_off' }}
            </mat-icon>
            
            <!-- Show error messages -->
            <mat-error *ngIf="confirmPwd.touched && registration.password !== confirmPassword">
              Passwords do not match
            </mat-error>
          </mat-form-field>

          <!-- Submit Button -->
          <button mat-raised-button 
                  color="primary" 
                  type="submit"
                  class="full-width"
                  style="height: 48px; font-size: 16px; margin-bottom: 20px;"
                  [disabled]="registerForm.invalid || loading || registration.password !== confirmPassword">
            
            <!-- Show spinner while loading -->
            <mat-spinner *ngIf="loading" 
                        diameter="20" 
                        style="display: inline-block; margin-right: 10px;">
            </mat-spinner>
            
            <span *ngIf="!loading">
              <mat-icon style="margin-right: 8px;">person_add</mat-icon>
              Create Account
            </span>
            <span *ngIf="loading">Creating Account...</span>
          </button>

          <!-- Login Link -->
          <div style="text-align: center;">
            <p style="color: #666;">
              Already have an account? 
              <a routerLink="/login" 
                 style="color: #1976d2; text-decoration: none; font-weight: 500;">
                Sign In Here
              </a>
            </p>
          </div>
        </form>
      </mat-card>
    </div>
  `
})
export class CustomerRegisterComponent {
  // Form data
  registration: CustomerRegistration = {
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  };
  
  confirmPassword = '';           // For password confirmation
  hidePassword = true;           // Controls password visibility
  hideConfirmPassword = true;    // Controls confirm password visibility
  loading = false;               // Shows loading spinner

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar  // For showing success/error messages
  ) {}

  // Handle form submission
  onSubmit(form: NgForm): void {
    // Check if form is valid
    if (form.invalid) {
      this.showMessage('Please fill all required fields correctly.', 'error');
      return;
    }

    // Check if passwords match
    if (this.registration.password !== this.confirmPassword) {
      this.showMessage('Passwords do not match.', 'error');
      return;
    }

    // Start registration process
    this.loading = true;
    
    this.authService.register(this.registration).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.success) {
          // Registration successful
          this.showMessage(response.message, 'success');
          
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          // Registration failed
          this.showMessage(response.message, 'error');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Registration error:', error);
        this.showMessage('Registration failed. Please try again.', 'error');
      }
    });
  }

  // Show success or error message
  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}