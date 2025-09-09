// Booking data models - defines booking information

// Complete booking information
export interface Booking {
  bookingId: number;
  trainId: number;
  customerId: number;
  dateOfJourney: string;    // Format: YYYY-MM-DD
  seatsBooked: number;
  status: 'CONFIRMED' | 'CANCELLED';
  train?: any;             // Optional - train details
  customer?: any;          // Optional - customer details
  totalPrice?: number;     // Optional - calculated total cost
}

// Information needed to create a new booking
export interface BookingRequest {
  trainId: number;
  dateOfJourney: string;
  seatsBooked: number;
}