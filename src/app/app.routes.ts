// Route configuration - defines which component loads for each URL
import { Routes } from '@angular/router';
import { TrainListComponent } from './components/train-list/train-list.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Default route - when user visits the app, show trains page
  { path: '', redirectTo: '/trains', pathMatch: 'full' },
  
  // Public routes - anyone can access these
  { path: 'trains', component: TrainListComponent },
  { path: 'register', component: CustomerRegisterComponent },
  { path: 'login', component: CustomerLoginComponent },
  
  // Protected routes - only logged in users can access these
  { path: 'book/:trainId', component: BookingFormComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingListComponent, canActivate: [AuthGuard] },
  { path: 'booking/:id', component: BookingDetailsComponent, canActivate: [AuthGuard] }
];