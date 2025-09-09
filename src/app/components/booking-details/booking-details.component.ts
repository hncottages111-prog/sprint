// Booking Details Component - shows detailed information for a specific booking
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snackbar';

import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div style="max-width: 700px; margin: 0 auto;">
      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <!-- Booking Not Found -->
      <mat-card *ngIf="!loading && !booking" style="text-align: center; padding: 40px;">
        <mat-icon style="font-size: 48px; color: #f44336;">error</mat-icon>
        <h3 style="color: #f44336; margin: 20px 0;">Booking Not Found</h3>
        <p style="color: #666; margin-bottom: 20px;">The requested booking could not be found.</p>
        <button mat-raised-button color="primary" (click)="goBackToBookings()">
          <mat-icon>arrow_back</mat-icon>
          Back to Bookings
        </button>
      </mat-card>

      <!-- Booking Details -->
      <div *ngIf="!loading && booking">
        <!-- Header Card -->
        <mat-card style="margin-bottom: 20px; padding: 25px; text-align: center;">
          <mat-icon style="font-size: 60px; color: #1976d2; margin-bottom: 15px;">confirmation_number</mat-icon>
          <h1 style="margin: 0 0 10px 0; color: #1976d2;">Booking #{{ booking.bookingId }}</h1>
          
          <!-- Status Chip -->
          <mat-chip-listbox>
            <mat-chip *ngIf="booking.status === 'CONFIRMED'" 
                     style="background-color: #e8f5e8; color: #2e7d32; font-size: 16px; padding: 10px 15px;">
              ✓ Confirmed
            </mat-chip>
            <mat-chip *ngIf="booking.status === 'CANCELLED'" 
                     style="background-color: #ffebee; color: #c62828; font-size: 16px; padding: 10px 15px;">
              ✗ Cancelled
            </mat-chip>
          </mat-chip-listbox>
        </mat-card>

        <!-- Train Information Card -->
        <mat-card *ngIf="booking.train" style="margin-bottom: 20px; padding: 25px;">
          <h3 style="margin: 0 0 20px 0; color: #333;">
            <mat-icon style="vertical-align: middle; margin-right: 10px;">train</mat-icon>
            Train Information
          </h3>

          <!-- Train Name -->
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="margin: 0; color: #1976d2;">{{ booking.train.trainName }}</h2>
            <p style="margin: 5px 0 0 0; color: #666;">Train #{{ booking.train.trainId }}</p>
          </div>

          <!-- Route Information -->
          <div style="display: flex; align-items: center; margin-bottom: 25px;">
            <div style="flex: 1; text-align: center;">
              <div style="font-weight: 500; font-size: 20px; margin-bottom: 5px;">{{ booking.train.source }}</div>
              <div style="color: #666; font-size: 16px;">Departure</div>
              <div style="color: #1976d2; font-weight: 500; font-size: 18px;">{{ booking.train.departureTime }}</div>
            </div>
            
            <div style="flex: 0 0 auto; margin: 0 20px;">
              <mat-icon style="color: #1976d2; font-size: 36px;">arrow_forward</mat-icon>
            </div>
            
            <div style="flex: 1; text-align: center;">
              <div style="font-weight: 500; font-size: 20px; margin-bottom: 5px;">{{ booking.train.destination }}</div>
              <div style="color: #666; font-size: 16px;">Arrival</div>
              <div style="color: #1976d2; font-weight: 500; font-size: 18px;">{{ booking.train.arrivalTime }}</div>
            </div>
          </div>

          <!-- Train Details -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <div style="text-align: center;">
              <mat-icon style="color: #4caf50; font-size: 24px; margin-bottom: 5px;">attach_money</mat-icon>
              <div style="font-size: 14px; color: #666;">Price per Seat</div>
              <div style="font-weight: 500; font-size: 16px;">\${{ booking.train.price | number:'1.2-2' }}</div>
            </div>
            
            <div style="text-align: center;">
              <mat-icon style="color: #ff9800; font-size: 24px; margin-bottom: 5px;">airline_seat_recline_normal</mat-icon>
              <div style="font-size: 14px; color: #666;">Available Seats</div>
              <div style="font-weight: 500; font-size: 16px;">{{ booking.train.seatsAvailable }}</div>
            </div>
          </div>
        </mat-card>

        <!-- Booking Details Card -->
        <mat-card style="margin-bottom: 20px; padding: 25px;">
          <h3 style="margin: 0 0 20px 0; color: #333;">
            <mat-icon style="vertical-align: middle; margin-right: 10px;">receipt</mat-icon>
            Booking Details
          </h3>

          <!-- Journey Date -->
          <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <mat-icon style="color: #1976d2; margin-right: 15px; font-size: 24px;">event</mat-icon>
            <div>
              <div style="font-size: 14px; color: #666;">Journey Date</div>
              <div style="font-weight: 500; font-size: 18px;">{{ formatDate(booking.dateOfJourney) }}</div>
            </div>
          </div>

          <!-- Seats Booked -->
          <div style="display: flex; align-items: center; margin-bottom: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
            <mat-icon style="color: #4caf50; margin-right: 15px; font-size: 24px;">airline_seat_recline_normal</mat-icon>
            <div>
              <div style="font-size: 14px; color: #666;">Seats Booked</div>
              <div style="font-weight: 500; font-size: 18px;">{{ booking.seatsBooked }} seat(s)</div>
            </div>
          </div>

          <!-- Total Amount -->
          <div *ngIf="booking.totalPrice" style="display: flex; align-items: center; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
            <mat-icon style="color: #1976d2; margin-right: 15px; font-size: 24px;">attach_money</mat-icon>
            <div>
              <div style="font-size: 14px; color: #666;">Total Amount Paid</div>
              <div style="font-weight: 500; font-size: 24px; color: #1976d2;">
                \${{ booking.totalPrice | number:'1.2-2' }}
              </div>
            </div>
          </div>
        </mat-card>

        <!-- Action Buttons -->
        <mat-card style="padding: 20px;">
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <!-- Back to Bookings -->
            <button mat-button (click)="goBackToBookings()" style="flex: 1;">
              <mat-icon>arrow_back</mat-icon>
              Back to Bookings
            </button>

            <!-- Book Again -->
            <button mat-raised-button 
                    color="primary" 
                    *ngIf="booking.train"
                    (click)="bookAgain(booking.train.trainId)"
                    style="flex: 1;">
              <mat-icon>replay</mat-icon>
              Book Again
            </button>

            <!-- Cancel Booking -->
            <button mat-raised-button 
                    color="warn"
                    *ngIf="booking.status === 'CONFIRMED'"
                    (click)="confirmCancelBooking()"
                    style="flex: 1;">
              <mat-icon>cancel</mat-icon>
              Cancel Booking
            </button>
          </div>
        </mat-card>
      </div>
    </div>
  `
})
export class BookingDetailsComponent implements OnInit {
  booking: Booking | null = null;  // Booking details
  loading = false;                 // Loading state

  constructor(
    private route: ActivatedRoute,      // To get booking ID from URL
    private router: Router,
    private bookingService: BookingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Get booking ID from URL parameters
    const bookingId = Number(this.route.snapshot.paramMap.get('id'));
    if (bookingId) {
      this.loadBookingDetails(bookingId);
    }
  }

  // Load booking details from service
  loadBookingDetails(bookingId: number): void {
    this.loading = true;
    
    this.bookingService.getBookingById(bookingId).subscribe({
      next: (booking) => {
        this.booking = booking || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading booking:', error);
        this.loading = false;
        this.showMessage('Error loading booking details.', 'error');
      }
    });
  }

  // Navigate back to bookings list
  goBackToBookings(): void {
    this.router.navigate(['/bookings']);
  }

  // Navigate to booking form for the same train
  bookAgain(trainId: number): void {
    this.router.navigate(['/book', trainId]);
  }

  // Show confirmation dialog before cancelling booking
  confirmCancelBooking(): void {
    if (!this.booking) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancel Booking',
        message: `Are you sure you want to cancel booking #${this.booking.bookingId}?`,
        details: `This will cancel ${this.booking.seatsBooked} seat(s) for ${this.booking.train?.trainName || 'the train'} on ${this.formatDate(this.booking.dateOfJourney)}.`,
        confirmText: 'Cancel Booking',
        cancelText: 'Keep Booking'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.booking) {
        this.cancelBooking(this.booking.bookingId);
      }
    });
  }

  // Cancel the booking
  cancelBooking(bookingId: number): void {
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage(response.message, 'success');
          this.loadBookingDetails(bookingId); // Reload to show updated status
        } else {
          this.showMessage(response.message, 'error');
        }
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
        this.showMessage('Error cancelling booking. Please try again.', 'error');
      }
    });
  }

  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
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