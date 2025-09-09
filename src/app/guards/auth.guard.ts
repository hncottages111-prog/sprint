// Auth Guard - prevents unauthorized users from accessing protected pages
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is logged in
  if (authService.isAuthenticated()) {
    return true; // Allow access to the page
  } else {
    // User not logged in - redirect to login page
    router.navigate(['/login']);
    return false; // Deny access to the page
  }
};