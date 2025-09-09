// Customer Login Component - allows users to log into their accounts
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

import { CustomerLogin } from '../../models/customer.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-login',
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
    <div style="max-width: 450px; margin: 0 auto;">
      <mat-card style="padding: 30px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
          <mat-icon style="font-size: 48px; color: #1976d2;">login</mat-icon>
          <h2 style="margin: 10px 0;">Welcome Back</h2>
          <p style="color: #666;">Sign in to your account to book tickets</p>
        </div>

        <!-- Demo Accounts Info -->
        <mat-card style="background-color: #e3f2fd; margin-bottom: 20px; padding: 15px;">
          <h4 style="margin: 0 0 10px 0; color: #1976d2;">Demo Accounts:</h4>
          <div style="font-size: 14px;">
            <div><strong>Email:</strong> john@example.com | <strong>Password:</strong> password123</div>
            <div><strong>Email:</strong> jane@example.com | <strong>Password:</strong> password456</div>
            <div><strong>Email:</strong> bob@example.com | <strong>Password:</strong> password789</div>
          </div>
        </mat-card>

        <!-- Login Form -->
        <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
          <!-- Email Field -->
          <mat-form-field class="full-width" style="margin-bottom: 20px;">
            <mat-label>Email Address</mat-label>
            <input matInput 
                   type="email"
                   name="email"
                   [(ngModel)]="credentials.email"
                   #email="ngModel"
                   required
                   email
                   placeholder="Enter your email">
            <mat-icon matSuffix>email</mat-icon>
            
            <!-- Show error messages -->
            <mat-error *ngIf="email.invalid && (email.dirty || email.touched)">
              <span *ngIf="email.errors?.['required']">Email is required</span>
              <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
            </mat-error>
          </mat-form-field>

          <!-- Password Field -->
          <mat-form-field class="full-width" style="margin-bottom: 25px;">
            <mat-label>Password</mat-label>
            <input matInput 
                   [type]="hidePassword ? 'password' : 'text'"
                   name="password"
                   [(ngModel)]="credentials.password"
                   #password="ngModel"
                   required
                   placeholder="Enter your password">
            <mat-icon matSuffix (click)="hidePassword = !hidePassword" style="cursor: pointer;">
              {{ hidePassword ? 'visibility' : 'visibility_off' }}
            </mat-icon>
            
            <!-- Show error messages -->
            <mat-error *ngIf="password.invalid && (password.dirty || password.touched)">
              Password is required
            </mat-error>
          </mat-form-field>

          <!-- Submit Button -->
          <button mat-raised-button 
                  color="primary" 
                  type="submit"
                  class="full-width"
                  style="height: 48px; font-size: 16px; margin-bottom: 20px;"
                  [disabled]="loginForm.invalid || loading">
            
            <!-- Show spinner while loading -->
            <mat-spinner *ngIf="loading" 
                        diameter="20" 
                        style="display: inline-block; margin-right: 10px;">
            </mat-spinner>
            
            <span *ngIf="!loading">
              <mat-icon style="margin-right: 8px;">login</mat-icon>
              Sign In
            </span>
            <span *ngIf="loading">Signing In...</span>
          </button>

          <!-- Registration Link -->
          <div style="text-align: center;">
            <p style="color: #666;">
              Don't have an account? 
              <a routerLink="/register" 
                 style="color: #1976d2; text-decoration: none; font-weight: 500;">
                Create Account
              </a>
            </p>
          </div>
        </form>
      </mat-card>
    </div>
  `
})
export class CustomerLoginComponent {
  // Form data for login
  credentials: CustomerLogin = {
    email: '',
    password: ''
  };
  
  hidePassword = true;  // Controls password visibility
  loading = false;      // Shows loading spinner

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar  // For showing messages
  ) {}

  // Handle login form submission
  onSubmit(form: NgForm): void {
    // Check if form is valid
    if (form.invalid) {
      this.showMessage('Please enter valid email and password.', 'error');
      return;
    }

    // Start login process
    this.loading = true;
    
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.success) {
          // Login successful
          this.showMessage(`Welcome back, ${response.customer?.name}!`, 'success');
          
          // Redirect to trains page after short delay
          setTimeout(() => {
            this.router.navigate(['/trains']);
          }, 1500);
        } else {
          // Login failed
          this.showMessage(response.message, 'error');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Login error:', error);
        this.showMessage('Login failed. Please try again.', 'error');
      }
    });
  }

  // Show success or error message
  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}