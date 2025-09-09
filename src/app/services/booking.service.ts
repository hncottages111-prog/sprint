// Booking Service - handles all booking-related operations
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Booking, BookingRequest } from '../models/booking.model';
import { TrainService } from './train.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // Sample booking data - in a real app, this would be in a database
  private bookings: Booking[] = [
    {
      bookingId: 1,
      trainId: 1,
      customerId: 1,
      dateOfJourney: '2024-02-15',
      seatsBooked: 2,
      status: 'CONFIRMED',
      totalPrice: 179.98
    },
    {
      bookingId: 2,
      trainId: 2,
      customerId: 2,
      dateOfJourney: '2024-02-20',
      seatsBooked: 1,
      status: 'CONFIRMED',
      totalPrice: 125.50
    }
  ];

  private nextBookingId = 3; // For generating new booking IDs

  constructor(private trainService: TrainService) {}

  // Create a new booking
  createBooking(customerId: number, bookingRequest: BookingRequest): Observable<{ success: boolean; message: string; booking?: Booking }> {
    return new Observable(observer => {
      // First, get the train details to check availability and calculate price
      this.trainService.getTrainById(bookingRequest.trainId).subscribe(train => {
        if (!train) {
          observer.next({ 
            success: false, 
            message: 'Train not found.' 
          });
          observer.complete();
          return;
        }

        // Check if enough seats are available
        if (train.seatsAvailable < bookingRequest.seatsBooked) {
          observer.next({ 
            success: false, 
            message: `Only ${train.seatsAvailable} seats available. You requested ${bookingRequest.seatsBooked} seats.` 
          });
          observer.complete();
          return;
        }

        // Check if journey date is in the future
        const journeyDate = new Date(bookingRequest.dateOfJourney);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (journeyDate < today) {
          observer.next({ 
            success: false, 
            message: 'Cannot book for past dates. Please select a future date.' 
          });
          observer.complete();
          return;
        }

        // Create the booking
        const totalPrice = train.price * bookingRequest.seatsBooked;
        
        const newBooking: Booking = {
          bookingId: this.nextBookingId++,
          trainId: bookingRequest.trainId,
          customerId: customerId,
          dateOfJourney: bookingRequest.dateOfJourney,
          seatsBooked: bookingRequest.seatsBooked,
          status: 'CONFIRMED',
          totalPrice: totalPrice
        };

        // Add booking to our list
        this.bookings.push(newBooking);

        // Update train seat availability
        this.trainService.updateSeats(bookingRequest.trainId, bookingRequest.seatsBooked).subscribe();

        // Return success response
        setTimeout(() => {
          observer.next({ 
            success: true, 
            message: 'Booking confirmed successfully!',
            booking: newBooking 
          });
          observer.complete();
        }, 500);
      });
    });
  }

  // Get all bookings for a specific customer
  getBookingsByCustomer(customerId: number): Observable<Booking[]> {
    const customerBookings = this.bookings.filter(b => b.customerId === customerId);
    
    // Add train details to each booking
    const bookingsWithDetails = customerBookings.map(booking => {
      this.trainService.getTrainById(booking.trainId).subscribe(train => {
        booking.train = train;
      });
      return booking;
    });
    
    return of(bookingsWithDetails).pipe(delay(300));
  }

  // Get specific booking by ID
  getBookingById(bookingId: number): Observable<Booking | undefined> {
    const booking = this.bookings.find(b => b.bookingId === bookingId);
    
    if (booking) {
      // Add train details
      this.trainService.getTrainById(booking.trainId).subscribe(train => {
        booking.train = train;
      });
    }
    
    return of(booking).pipe(delay(300));
  }

  // Cancel a booking
  cancelBooking(bookingId: number): Observable<{ success: boolean; message: string }> {
    const booking = this.bookings.find(b => b.bookingId === bookingId);
    
    if (!booking) {
      return of({ 
        success: false, 
        message: 'Booking not found.' 
      }).pipe(delay(200));
    }

    if (booking.status === 'CANCELLED') {
      return of({ 
        success: false, 
        message: 'Booking is already cancelled.' 
      }).pipe(delay(200));
    }

    // Cancel the booking
    booking.status = 'CANCELLED';

    // Release the seats back to the train
    this.trainService.releaseSeats(booking.trainId, booking.seatsBooked).subscribe();

    return of({ 
      success: true, 
      message: 'Booking cancelled successfully. Seats have been released.' 
    }).pipe(delay(300));
  }
}