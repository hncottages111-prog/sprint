// Train Service - handles all train-related data operations
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Train } from '../models/train.model';

@Injectable({
  providedIn: 'root'  // Makes this service available throughout the app
})
export class TrainService {
  // Sample train data - in a real app, this would come from a database
  private trains: Train[] = [
    {
      trainId: 1,
      trainName: 'Express 101',
      source: 'New York',
      destination: 'Boston',
      departureTime: '08:00',
      arrivalTime: '12:00',
      seatsAvailable: 45,
      price: 89.99
    },
    {
      trainId: 2,
      trainName: 'Metro 202',
      source: 'Boston',
      destination: 'Washington DC',
      departureTime: '14:30',
      arrivalTime: '20:15',
      seatsAvailable: 32,
      price: 125.50
    },
    {
      trainId: 3,
      trainName: 'Coast Runner 303',
      source: 'Los Angeles',
      destination: 'San Francisco',
      departureTime: '07:45',
      arrivalTime: '15:20',
      seatsAvailable: 28,
      price: 110.75
    },
    {
      trainId: 4,
      trainName: 'Mountain Express 404',
      source: 'Denver',
      destination: 'Salt Lake City',
      departureTime: '16:00',
      arrivalTime: '22:30',
      seatsAvailable: 55,
      price: 95.25
    },
    {
      trainId: 5,
      trainName: 'Desert Wind 505',
      source: 'Phoenix',
      destination: 'Las Vegas',
      departureTime: '10:15',
      arrivalTime: '15:45',
      seatsAvailable: 40,
      price: 75.00
    }
  ];

  // Get all trains - returns as Observable to simulate API call
  getAllTrains(): Observable<Train[]> {
    return of(this.trains).pipe(delay(500)); // Add small delay to simulate network
  }

  // Get a specific train by its ID
  getTrainById(id: number): Observable<Train | undefined> {
    const train = this.trains.find(t => t.trainId === id);
    return of(train).pipe(delay(300));
  }

  // Search trains by source and destination cities
  searchTrains(source?: string, destination?: string): Observable<Train[]> {
    let filteredTrains = this.trains;
    
    // Filter by source city if provided
    if (source && source.trim()) {
      filteredTrains = filteredTrains.filter(train => 
        train.source.toLowerCase().includes(source.toLowerCase())
      );
    }
    
    // Filter by destination city if provided
    if (destination && destination.trim()) {
      filteredTrains = filteredTrains.filter(train => 
        train.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    return of(filteredTrains).pipe(delay(300));
  }

  // Reduce available seats when booking is made
  updateSeats(trainId: number, seatsToBook: number): Observable<boolean> {
    const train = this.trains.find(t => t.trainId === trainId);
    if (train && train.seatsAvailable >= seatsToBook) {
      train.seatsAvailable -= seatsToBook;
      return of(true).pipe(delay(200));
    }
    return of(false).pipe(delay(200));
  }

  // Add seats back when booking is cancelled
  releaseSeats(trainId: number, seatsToRelease: number): Observable<boolean> {
    const train = this.trains.find(t => t.trainId === trainId);
    if (train) {
      train.seatsAvailable += seatsToRelease;
      return of(true).pipe(delay(200));
    }
    return of(false).pipe(delay(200));
  }
}