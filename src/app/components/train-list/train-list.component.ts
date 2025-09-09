// Train List Component - displays all trains with search functionality
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { Train } from '../../models/train.model';
import { TrainService } from '../../services/train.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-train-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  template: `
    <div style="max-width: 1200px; margin: 0 auto;">
      <h1 style="text-align: center; margin-bottom: 30px;">
        🚂 Available Trains
      </h1>

      <!-- Search Form -->
      <mat-card style="margin-bottom: 30px; padding: 20px;">
        <h3>Search Trains</h3>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; align-items: end;">
          <!-- Source City Input -->
          <mat-form-field style="flex: 1; min-width: 200px;">
            <mat-label>From (Source City)</mat-label>
            <input matInput 
                   [(ngModel)]="searchSource" 
                   placeholder="e.g. New York"
                   (keyup.enter)="searchTrains()">
            <mat-icon matSuffix>place</mat-icon>
          </mat-form-field>

          <!-- Destination City Input -->
          <mat-form-field style="flex: 1; min-width: 200px;">
            <mat-label>To (Destination City)</mat-label>
            <input matInput 
                   [(ngModel)]="searchDestination" 
                   placeholder="e.g. Boston"
                   (keyup.enter)="searchTrains()">
            <mat-icon matSuffix>place</mat-icon>
          </mat-form-field>

          <!-- Search Buttons -->
          <div style="display: flex; gap: 10px;">
            <button mat-raised-button 
                    color="primary" 
                    (click)="searchTrains()"
                    [disabled]="loading">
              <mat-icon>search</mat-icon>
              Search
            </button>
            
            <button mat-button 
                    (click)="clearSearch()"
                    [disabled]="loading">
              <mat-icon>clear</mat-icon>
              Clear
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Loading Spinner -->
      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <!-- No Trains Found Message -->
      <mat-card *ngIf="!loading && trains.length === 0" style="text-align: center; padding: 40px;">
        <mat-icon style="font-size: 48px; color: #666;">train</mat-icon>
        <h3 style="color: #666; margin: 20px 0;">No trains found</h3>
        <p style="color: #999;">Try adjusting your search criteria or check back later.</p>
      </mat-card>

      <!-- Train Cards -->
      <div *ngIf="!loading && trains.length > 0" 
           style="display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 20px;">
        
        <mat-card *ngFor="let train of trains" style="padding: 0;">
          <!-- Card Header -->
          <mat-card-header style="padding: 16px; background-color: #f5f5f5;">
            <mat-card-title>
              <mat-icon style="vertical-align: middle; margin-right: 8px;">train</mat-icon>
              {{ train.trainName }}
            </mat-card-title>
            <mat-card-subtitle>Train #{{ train.trainId }}</mat-card-subtitle>
          </mat-card-header>

          <!-- Card Content -->
          <mat-card-content style="padding: 16px;">
            <!-- Route Information -->
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <div style="flex: 1; text-align: center;">
                <div style="font-weight: 500; font-size: 16px;">{{ train.source }}</div>
                <div style="color: #666; font-size: 14px;">{{ train.departureTime }}</div>
              </div>
              
              <div style="flex: 0 0 auto; margin: 0 15px;">
                <mat-icon style="color: #1976d2;">arrow_forward</mat-icon>
              </div>
              
              <div style="flex: 1; text-align: center;">
                <div style="font-weight: 500; font-size: 16px;">{{ train.destination }}</div>
                <div style="color: #666; font-size: 14px;">{{ train.arrivalTime }}</div>
              </div>
            </div>

            <!-- Journey Details -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
              <!-- Available Seats -->
              <div style="display: flex; align-items: center;">
                <mat-icon style="color: #4caf50; margin-right: 8px;">airline_seat_recline_normal</mat-icon>
                <span>
                  <strong>{{ train.seatsAvailable }}</strong> seats available
                </span>
              </div>

              <!-- Price -->
              <div style="display: flex; align-items: center;">
                <mat-icon style="color: #ff9800; margin-right: 8px;">attach_money</mat-icon>
                <span style="font-size: 18px; font-weight: 500; color: #1976d2;">
                  \${{ train.price | number:'1.2-2' }}
                </span>
              </div>
            </div>

            <!-- Availability Status -->
            <div style="margin-bottom: 15px;">
              <mat-chip-listbox>
                <mat-chip *ngIf="train.seatsAvailable > 10" 
                         style="background-color: #e8f5e8; color: #2e7d32;">
                  ✓ Available
                </mat-chip>
                <mat-chip *ngIf="train.seatsAvailable <= 10 && train.seatsAvailable > 0" 
                         style="background-color: #fff3e0; color: #f57c00;">
                  ⚠ Few Seats Left
                </mat-chip>
                <mat-chip *ngIf="train.seatsAvailable === 0" 
                         style="background-color: #ffebee; color: #c62828;">
                  ✗ Sold Out
                </mat-chip>
              </mat-chip-listbox>
            </div>
          </mat-card-content>

          <!-- Card Actions -->
          <mat-card-actions style="padding: 16px; border-top: 1px solid #e0e0e0;">
            <button mat-raised-button 
                    color="primary" 
                    (click)="bookTrain(train.trainId)"
                    [disabled]="train.seatsAvailable === 0 || !isLoggedIn()"
                    style="width: 100%;">
              <mat-icon>confirmation_number</mat-icon>
              {{ train.seatsAvailable === 0 ? 'Sold Out' : 'Book Now' }}
            </button>
            
            <!-- Login Message for Non-Authenticated Users -->
            <div *ngIf="!isLoggedIn()" 
                 style="text-align: center; margin-top: 10px; color: #666; font-size: 14px;">
              <mat-icon style="font-size: 16px; vertical-align: middle;">info</mat-icon>
              Please <a routerLink="/login" style="color: #1976d2;">login</a> to book tickets
            </div>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `
})
export class TrainListComponent implements OnInit {
  trains: Train[] = [];         // List of trains to display
  loading = false;              // Shows loading spinner when true
  searchSource = '';            // User's search input for source city
  searchDestination = '';       // User's search input for destination city

  constructor(
    private trainService: TrainService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load all trains when component starts
    this.loadAllTrains();
  }

  // Load all available trains
  loadAllTrains(): void {
    this.loading = true;
    this.trainService.getAllTrains().subscribe({
      next: (trains) => {
        this.trains = trains;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trains:', error);
        this.loading = false;
      }
    });
  }

  // Search trains based on source and destination
  searchTrains(): void {
    this.loading = true;
    this.trainService.searchTrains(this.searchSource, this.searchDestination).subscribe({
      next: (trains) => {
        this.trains = trains;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching trains:', error);
        this.loading = false;
      }
    });
  }

  // Clear search filters and show all trains
  clearSearch(): void {
    this.searchSource = '';
    this.searchDestination = '';
    this.loadAllTrains();
  }

  // Navigate to booking form for selected train
  bookTrain(trainId: number): void {
    this.router.navigate(['/book', trainId]);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}