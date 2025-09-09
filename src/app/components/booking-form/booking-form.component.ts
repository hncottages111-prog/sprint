// Booking Form Component - allows users to book tickets for a specific train
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snackbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Train } from '../../models/train.model';
import { BookingRequest } from '../../models/booking.model';
import { TrainService } from '../../services/train.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-booking-form',
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
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div style="max-width: 600px; margin: 0 auto;">
      <!-- Loading State -->
      <div *ngIf="loadingTrain" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <!-- Train Not Found -->
      <mat-card *ngIf="!loadingTrain && !train" style="text-align: center; padding: 40px;">
        <mat-icon style="font-size: 48px; color: #f44336;">error</mat-icon>
        <h3 style="color: #f44336; margin: 20px 0;">Train Not Found</h3>
        <p style="color: #666; margin-bottom: 20px;">The requested train could not be found.</p>
        <button mat-raised-button color="primary" (click)="goBackToTrains()">
          <mat-icon>arrow_back</mat-icon>
          Back to Trains
        </button>
      </mat-card>

      <!-- Booking Form -->
      <div *ngIf="!loadingTrain && train">
        <!-- Train Information Card -->
        <mat-card style="margin-bottom: 30px; padding: 20px;">
          <h2 style="margin: 0 0 20px 0; color: #1976d2;">
            <mat-icon style="vertical-align: middle; margin-right: 10px;">train</mat-icon>
            {{ train.trainName }}
          </h2>
          
          <!-- Route Information -->
          <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <div style="flex: 1; text-align: center;">
              <div style="font-size: 18px; font-weight: 500;">{{ train.source }}</div>
              <div style="color: #666;">Departure: {{ train.departureTime }}</div>
            </div>
            
            <div style="flex: 0 0 auto; margin: 0 20px;">
              <mat-icon style="color: #1976d2; font-size: 28px;">arrow_forward</mat-icon>
            </div>
            
            <div style="flex: 1; text-align: center;">
              <div style="font-size: 18px; font-weight: 500;">{{ train.destination }}</div>
              <div style="color: #666;">Arrival: {{ train.arrivalTime }}</div>
            </div>
          </div>

          <!-- Train Details Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <div style="display: flex; align-items: center;">
              <mat-icon style="color: #4caf50; margin-right: 8px;">airline_seat_recline_normal</mat-icon>
              <span><strong>{{ train.seatsAvailable }}</strong> seats available</span>
            </div>
            
            <div style="display: flex; align-items: center;">
              <mat-icon style="color: #ff9800; margin-right: 8px;">attach_money</mat-icon>
              <span style="font-size: 18px; font-weight: 500;">
                \${{ train.price | number:'1.2-2' }} per seat
              </span>
            </div>
          </div>
        </mat-card>

        <!-- Booking Form Card -->
        <mat-card style="padding: 30px;">
          <h3 style="margin: 0 0 25px 0;">
            <mat-icon style="vertical-align: middle; margin-right: 10px;">confirmation_number</mat-icon>
            Book Your Tickets
          </h3>

          <form #bookingForm="ngForm" (ngSubmit)="onSubmit(bookingForm)">
            <!-- Journey Date Field -->
            <mat-form-field class="full-width" style="margin-bottom: 20px;">
              <mat-label>Journey Date</mat-label>
              <input matInput 
                     [matDatepicker]="picker"
                     name="dateOfJourney"
                     [(ngModel)]="selectedDate"
                     #journeyDate="ngModel"
                     [min]="minDate"
                     required
                     readonly>
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              
              <!-- Show error messages -->
              <mat-error *ngIf="journeyDate.invalid && (journeyDate.dirty || journeyDate.touched)">
                Please select a journey date
              </mat-error>
            </mat-form-field>

            <!-- Number of Seats Field -->
            <mat-form-field class="full-width" style="margin-bottom: 20px;">
              <mat-label>Number of Seats</mat-label>
              <input matInput 
                     type="number"
                     name="seatsBooked"
                     [(ngModel)]="bookingRequest.seatsBooked"
                     #seats="ngModel"
                     required
                     min="1"
                     [max]="train.seatsAvailable"
                     (input)="calculateTotal()">
              <mat-icon matSuffix>airline_seat_recline_normal</mat-icon>
              
              <!-- Show error messages -->
              <mat-error *ngIf="seats.invalid && (seats.dirty || seats.touched)">
                <span *ngIf="seats.errors?.['required']">Number of seats is required</span>
                <span *ngIf="seats.errors?.['min']">Minimum 1 seat required</span>
                <span *ngIf="seats.errors?.['max']">Only {{ train.seatsAvailable }} seats available</span>
              </mat-error>
              
              <!-- Helper text -->
              <mat-hint>Maximum {{ train.seatsAvailable }} seats available</mat-hint>
            </mat-form-field>

            <!-- Price Summary -->
            <div *ngIf="totalPrice > 0" 
                 style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h4 style="margin: 0 0 15px 0; color: #1976d2;">Price Summary</h4>
              
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Price per seat:</span>
                <span>\${{ train.price | number:'1.2-2' }}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Number of seats:</span>
                <span>{{ bookingRequest.seatsBooked }}</span>
              </div>
              
              <hr style="border: none; border-top: 1px solid #ccc; margin: 10px 0;">
              
              <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 500; color: #1976d2;">
                <span>Total Amount:</span>
                <span>\${{ totalPrice | number:'1.2-2' }}</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 15px;">
              <!-- Back Button -->
              <button mat-button 
                      type="button"
                      (click)="goBackToTrains()"
                      [disabled]="loading"
                      style="flex: 1;">
                <mat-icon>arrow_back</mat-icon>
                Back to Trains
              </button>

              <!-- Book Button -->
              <button mat-raised-button 
                      color="primary" 
                      type="submit"
                      style="flex: 2; height: 48px;"
                      [disabled]="bookingForm.invalid || loading || totalPrice <= 0">
                
                <!-- Show spinner while loading -->
                <mat-spinner *ngIf="loading" 
                            diameter="20" 
                            style="display: inline-block; margin-right: 10px;">
                </mat-spinner>
                
                <span *ngIf="!loading">
                  <mat-icon style="margin-right: 8px;">confirmation_number</mat-icon>
                  Confirm Booking
                </span>
                <span *ngIf="loading">Processing...</span>
              </button>
            </div>
          </form>
        </mat-card>
      </div>
    </div>
  `
})
export class BookingFormComponent implements OnInit {
  train: Train | null = null;      // Selected train details
  loadingTrain = false;            // Loading state for train data
  loading = false;                 // Loading state for booking process
  
  selectedDate: Date | null = null; // Selected journey date
  minDate = new Date();            // Minimum date (today)
  
  // Booking form data
  bookingRequest: BookingRequest = {
    trainId: 0,
    dateOfJourney: '',
    seatsBooked: 1
  };
  
  totalPrice = 0;  // Calculated total price

  constructor(
    private route: ActivatedRoute,      // To get train ID from URL
    private router: Router,
    private trainService: TrainService,
    private bookingService: BookingService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Get train ID from URL parameters
    const trainId = Number(this.route.snapshot.paramMap.get('trainId'));
    if (trainId) {
      this.loadTrainDetails(trainId);
      this.bookingRequest.trainId = trainId;
    }
  }

  // Load train details from service
  loadTrainDetails(trainId: number): void {
    this.loadingTrain = true;
    
    this.trainService.getTrainById(trainId).subscribe({
      next: (train) => {
        this.train = train || null;
        this.loadingTrain = false;
        
        // Calculate initial price if train found
        if (this.train) {
          this.calculateTotal();
        }
      },
      error: (error) => {
        console.error('Error loading train:', error);
        this.loadingTrain = false;
        this.showMessage('Error loading train details.', 'error');
      }
    });
  }

  // Calculate total price based on seats selected
  calculateTotal(): void {
    if (this.train && this.bookingRequest.seatsBooked > 0) {
      this.totalPrice = this.train.price * this.bookingRequest.seatsBooked;
    } else {
      this.totalPrice = 0;
    }
  }

  // Handle booking form submission
  onSubmit(form: NgForm): void {
    // Validate form
    if (form.invalid || !this.selectedDate) {
      this.showMessage('Please fill all required fields.', 'error');
      return;
    }

    // Validate seats availability
    if (this.train && this.bookingRequest.seatsBooked > this.train.seatsAvailable) {
      this.showMessage(`Only ${this.train.seatsAvailable} seats available.`, 'error');
      return;
    }

    // Format date for API
    this.bookingRequest.dateOfJourney = this.selectedDate.toISOString().split('T')[0];

    // Get current user ID
    const customerId = this.authService.getCurrentUserId();
    if (!customerId) {
      this.showMessage('Please log in to make a booking.', 'error');
      this.router.navigate(['/login']);
      return;
    }

    // Start booking process
    this.loading = true;
    
    this.bookingService.createBooking(customerId, this.bookingRequest).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response.success) {
          // Booking successful
          this.showMessage(response.message, 'success');
          
          // Redirect to bookings list after short delay
          setTimeout(() => {
            this.router.navigate(['/bookings']);
          }, 2000);
        } else {
          // Booking failed
          this.showMessage(response.message, 'error');
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Booking error:', error);
        this.showMessage('Booking failed. Please try again.', 'error');
      }
    });
  }

  // Navigate back to trains list
  goBackToTrains(): void {
    this.router.navigate(['/trains']);
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