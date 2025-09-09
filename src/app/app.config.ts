// Application configuration - sets up routing, HTTP client, and animations
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),        // Enable routing between pages
    provideAnimations(),          // Enable Angular Material animations
    provideHttpClient()          // Enable HTTP requests to backend
  ]
};