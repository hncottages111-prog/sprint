// Main entry point for our Angular application
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './app/services/auth.service';
import { appConfig } from './app/app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule
  ],
  template: `
    <!-- Main navigation toolbar -->
    <mat-toolbar color="primary">
      <span>🚂 Train Ticket System</span>
      
      <!-- Spacer to push buttons to the right -->
      <span style="flex: 1 1 auto;"></span>
      
      <!-- Navigation buttons -->
      <button mat-button (click)="goToTrains()">
        <mat-icon>train</mat-icon>
        Trains
      </button>
      
      <!-- Show different buttons based on login status -->
      <ng-container *ngIf="!isLoggedIn()">
        <button mat-button (click)="goToLogin()">
          <mat-icon>login</mat-icon>
          Login
        </button>
        <button mat-button (click)="goToRegister()">
          <mat-icon>person_add</mat-icon>
          Register
        </button>
      </ng-container>
      
      <ng-container *ngIf="isLoggedIn()">
        <button mat-button (click)="goToBookings()">
          <mat-icon>confirmation_number</mat-icon>
          My Bookings
        </button>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </ng-container>
    </mat-toolbar>
    
    <!-- Main content area where different pages will be displayed -->
    <main style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  // Check if user is currently logged in
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  
  // Navigation methods - these take user to different pages
  goToTrains(): void {
    this.router.navigate(['/trains']);
  }
  
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
  
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  
  goToBookings(): void {
    this.router.navigate(['/bookings']);
  }
  
  // Logout method
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/trains']);
  }
}

// Start the Angular application
bootstrapApplication(App, appConfig);