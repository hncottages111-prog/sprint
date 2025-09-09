# Train Ticket Management System - Angular Frontend

A comprehensive train ticket booking system built with Angular 18, featuring modern UI design with Angular Material and complete booking functionality.

## 🚂 Features

### Core Functionality
- **Train Listing**: Browse all available trains with search and filtering
- **User Registration**: Create new customer accounts with validation
- **User Authentication**: Secure login system with session management
- **Ticket Booking**: Book train tickets with date selection and seat management
- **Booking Management**: View and cancel existing bookings
- **Responsive Design**: Works perfectly on desktop and mobile devices

### Technical Features
- **Angular Material UI**: Modern, professional design system
- **Form Validation**: Real-time validation with helpful error messages
- **Route Guards**: Protected routes for authenticated users only
- **Mock Services**: Simulates backend API calls with realistic delays
- **Local Storage**: Persistent user sessions
- **TypeScript**: Full type safety throughout the application

## 🛠️ Technologies Used

- **Frontend Framework**: Angular 18
- **UI Components**: Angular Material
- **Styling**: CSS3 with Material Design
- **State Management**: Angular Services with RxJS
- **Routing**: Angular Router with Guards
- **Forms**: Template-driven forms with validation
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (v18 or higher)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd train-ticket-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Angular Material**
   ```bash
   npm install @angular/material @angular/cdk @angular/animations
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # UI Components
│   │   ├── train-list/      # Train listing and search
│   │   ├── customer-register/  # User registration
│   │   ├── customer-login/     # User login
│   │   ├── booking-form/       # Ticket booking form
│   │   ├── booking-list/       # User's bookings
│   │   ├── booking-details/    # Individual booking details
│   │   └── confirm-dialog/     # Confirmation dialog
│   ├── services/            # Business Logic Services
│   │   ├── train.service.ts    # Train operations
│   │   ├── auth.service.ts     # Authentication
│   │   └── booking.service.ts  # Booking management
│   ├── models/              # TypeScript Interfaces
│   │   ├── train.model.ts      # Train data structure
│   │   ├── customer.model.ts   # Customer data structure
│   │   └── booking.model.ts    # Booking data structure
│   ├── guards/              # Route Guards
│   │   └── auth.guard.ts       # Authentication guard
│   ├── app.config.ts        # App configuration
│   └── app.routes.ts        # Route definitions
├── global_styles.css        # Global styles
└── main.ts                  # App entry point
```

## 🚀 Usage Guide

### 1. Registration & Login
- New users can register via the "Register" button
- Existing users can login with their credentials
- Demo accounts are provided for testing

### 2. Browsing Trains
- View all available trains on the main page
- Search by source and destination cities
- Filter results using the search form

### 3. Booking Tickets
- Click "Book Now" on any available train
- Select journey date and number of seats
- Review price summary and confirm booking

### 4. Managing Bookings
- View all bookings in "My Bookings" section
- Cancel confirmed bookings if needed
- View detailed booking information

## 🎨 Demo Accounts

For testing purposes, the following demo accounts are available:

| Email | Password | Name |
|-------|----------|------|
| john@example.com | password123 | John Doe |
| jane@example.com | password456 | Jane Smith |
| bob@example.com | password789 | Bob Johnson |

## 🛡️ Security Features

- **Route Guards**: Protect booking-related pages
- **Form Validation**: Client-side input validation
- **Session Management**: Secure user session handling
- **Authentication State**: Persistent login status

## 📱 Responsive Design

The application is fully responsive and includes:
- **Desktop**: Full-featured layout with side navigation
- **Tablet**: Optimized card layouts and navigation
- **Mobile**: Touch-friendly interface with collapsible elements

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

### Code Style
- TypeScript strict mode enabled
- Angular coding standards followed
- Comprehensive comments for beginners
- Modular component architecture

## 🚦 API Integration

The current implementation uses mock services. To connect to a real backend:

1. **Update Service Base URL**
   ```typescript
   // In environment files
   export const environment = {
     apiUrl: 'http://your-backend-url/api'
   };
   ```

2. **Replace Mock Services**
   - Update `TrainService` to make HTTP calls
   - Update `AuthService` for real authentication
   - Update `BookingService` for database operations

3. **Add HTTP Interceptors**
   - Authentication headers
   - Error handling
   - Loading states

## 🌟 Future Enhancements

- **Payment Integration**: Add payment gateway support
- **Real-time Updates**: WebSocket for live seat availability
- **Push Notifications**: Booking confirmations and updates
- **Advanced Search**: More filter options and sorting
- **Admin Panel**: Train and booking management for operators
- **PWA Support**: Offline capabilities and app-like experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

---

**Note**: This is the frontend portion of the Train Ticket Management System. For a complete solution, you would need to implement the Spring Boot backend as specified in the original requirements.