// Booking List Component - displays all bookings for the current user
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snackbar';

import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div style="max-width: 1000px; margin: 0 auto;">
      <!-- Page Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h1>
          <mat-icon style="vertical-align: middle; margin-right: 10px;">confirmation_number</mat-icon>
          My Bookings
        </h1>
        
        <button mat-raised-button color="primary" (click)="goToTrains()">
          <mat-icon>train</mat-icon>
          Book New Ticket
        </button>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <!-- No Bookings Message -->
      <mat-card *ngIf="!loading && bookings.length === 0" style="text-align: center; padding: 40px;">
        <mat-icon style="font-size: 48px; color: #666;">confirmation_number</mat-icon>
        <h3 style="color: #666; margin: 20px 0;">No bookings found</h3>
        <p style="color: #999; margin-bottom: 25px;">
          You haven't made any train bookings yet. Book your first ticket to get started!
        </p>
        <button mat-raised-button color="primary" (click)="goToTrains()">
          <mat-icon>train</mat-icon>
          Browse Trains
        </button>
      </mat-card>

      <!-- Bookings List -->
      <div *ngIf="!loading && bookings.length > 0" 
           style="display: grid; gap: 20px;">
        
        <mat-card *ngFor="let booking of bookings" style="padding: 0;">
          <!-- Booking Header -->
          <div style="padding: 20px; background-color: #f8f9fa; border-bottom: 1px solid #e9ecef;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="margin: 0; color: #1976d2;">
                  Booking #{{ booking.bookingId }}
                </h3>
                <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
                  Booked on {{ formatDate(booking.dateOfJourney) }}
                </p>
              </div>
              
              <!-- Status Chip -->
              <mat-chip-listbox>
                <mat-chip *ngIf="booking.status === 'CONFIRMED'" 
                         style="background-color: #e8f5e8; color: #2e7d32;">
                  ✓ Confirmed
                </mat-chip>
                <mat-chip *ngIf="booking.status === 'CANCELLED'" 
                         style="background-color: #ffebee; color: #c62828;">
                  ✗ Cancelled
                </mat-chip>
              </mat-chip-listbox>
            </div>
          </div>

          <!-- Booking Details -->
          <div style="padding: 20px;">
            <!-- Train Information (if available) -->
            <div *ngIf="booking.train" style="margin-bottom: 20px;">
              <h4 style="margin: 0 0 15px 0; color: #333;">
                <mat-icon style="vertical-align: middle; margin-right: 8px;">train</mat-icon>
                {{ booking.train.trainName }}
              </h4>
              
              <!-- Route Information -->
              <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="flex: 1; text-align: center;">
                  <div style="font-weight: 500; font-size: 16px;">{{ booking.train.source }}</div>
                  <div style="color: #666; font-size: 14px;">{{ booking.train.departureTime }}</div>
                </div>
                
                <div style="flex: 0 0 auto; margin: 0 15px;">
                  <mat-icon style="color: #1976d2;">arrow_forward</mat-icon>
                </div>
                
                <div style="flex: 1; text-align: center;">
                  <div style="font-weight: 500; font-size: 16px;">{{ booking.train.destination }}</div>
                  <div style="color: #666; font-size: 14px;">{{ booking.train.arrivalTime }}</div>
                </div>
              </div>
            </div>

            <!-- Booking Details Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
              <!-- Journey Date -->
              <div style="display: flex; align-items: center;">
                <mat-icon style="color: #1976d2; margin-right: 8px;">event</mat-icon>
                <div>
                  <div style="font-size: 12px; color: #666;">Journey Date</div>
                  <div style="font-weight: 500;">{{ formatDate(booking.dateOfJourney) }}</div>
                </div>
              </div>

              <!-- Number of Seats -->
              <div style="display: flex; align-items: center;">
                <mat-icon style="color: #4caf50; margin-right: 8px;">airline_seat_recline_normal</mat-icon>
                <div>
                  <div style="font-size: 12px; color: #666;">Seats Booked</div>
                  <div style="font-weight: 500;">{{ booking.seatsBooked }} seat(s)</div>
                </div>
              </div>

              <!-- Total Price -->
              <div *ngIf="booking.totalPrice" style="display: flex; align-items: center;">
                <mat-icon style="color: #ff9800; margin-right: 8px;">attach_money</mat-icon>
                <div>
                  <div style="font-size: 12px; color: #666;">Total Amount</div>
                  <div style="font-weight: 500; color: #1976d2; font-size: 16px;">
                    \${{ booking.totalPrice | number:'1.2-2' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 10px; padding-top: 15px; border-top: 1px solid #e9ecef;">
              <!-- View Details Button -->
              <button mat-button 
                      (click)="viewBookingDetails(booking.bookingId)">
                <mat-icon>info</mat-icon>
                View Details
              </button>

              <!-- Cancel Booking Button (only for confirmed bookings) -->
              <button mat-button 
                      color="warn"
                      *ngIf="booking.status === 'CONFIRMED'"
                      (click)="confirmCancelBooking(booking)">
                <mat-icon>cancel</mat-icon>
                Cancel Booking
              </button>

              <!-- Spacer -->
              <span style="flex: 1;"></span>

              <!-- Book Again Button -->
              <button mat-raised-button 
                      color="primary" 
                      *ngIf="booking.train"
                      (click)="bookAgain(booking.trainId)">
                <mat-icon>replay</mat-icon>
                Book Again
              </button>
            </div>
          </div>
        </mat-card>
      </div>
    </div>
  `
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];    // List of user's bookings
  loading = false;             // Loading state

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,      // For confirmation dialogs
    private snackBar: MatSnackBar   // For showing messages
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  // Load all bookings for current user
  loadBookings(): void {
    const customerId = this.authService.getCurrentUserId();
    if (!customerId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    
    this.bookingService.getBookingsByCustomer(customerId).subscribe({
      next: (bookings) => {
        this.bookings = bookings.sort((a, b) => b.bookingId - a.bookingId); // Sort by newest first
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.loading = false;
        this.showMessage('Error loading bookings. Please try again.', 'error');
      }
    });
  }

  // Navigate to trains page
  goToTrains(): void {
    this.router.navigate(['/trains']);
  }

  // View detailed booking information
  viewBookingDetails(bookingId: number): void {
    this.router.navigate(['/booking', bookingId]);
  }

  // Show confirmation dialog before cancelling booking
  confirmCancelBooking(booking: Booking): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Cancel Booking',
        message: `Are you sure you want to cancel booking #${booking.bookingId}?`,
        details: `This will cancel ${booking.seatsBooked} seat(s) for ${booking.train?.trainName || 'the train'} on ${this.formatDate(booking.dateOfJourney)}.`,
        confirmText: 'Cancel Booking',
        cancelText: 'Keep Booking'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelBooking(booking.bookingId);
      }
    });
  }

  // Cancel a specific booking
  cancelBooking(bookingId: number): void {
    this.bookingService.cancelBooking(bookingId).subscribe({
      next: (response) => {
        if (response.success) {
          this.showMessage(response.message, 'success');
          this.loadBookings(); // Reload bookings to show updated status
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

  // Navigate to booking form for the same train
  bookAgain(trainId: number): void {
    this.router.navigate(['/book', trainId]);
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