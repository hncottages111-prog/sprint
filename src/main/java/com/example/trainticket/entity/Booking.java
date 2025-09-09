package com.example.trainticket.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Booking Entity representing train ticket bookings
 */
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "train_id", nullable = false)
    private Train train;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @NotNull(message = "Date of journey is required")
    @Future(message = "Date of journey must be in the future")
    @Column(name = "date_of_journey", nullable = false)
    private LocalDate dateOfJourney;

    @NotNull(message = "Number of seats booked is required")
    @Min(value = 1, message = "At least 1 seat must be booked")
    @Max(value = 10, message = "Cannot book more than 10 seats at once")
    @Column(name = "seats_booked", nullable = false)
    private Integer seatsBooked;

    @NotNull(message = "Booking status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private BookingStatus status;

    @DecimalMin(value = "0.0", inclusive = false, message = "Total price must be greater than 0")
    @Column(name = "total_price", precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    // Enum for booking status
    public enum BookingStatus {
        CONFIRMED, CANCELLED
    }

    // Default constructor
    public Booking() {
        this.bookingDate = LocalDate.now();
        this.status = BookingStatus.CONFIRMED;
    }

    // Constructor with parameters
    public Booking(Train train, Customer customer, LocalDate dateOfJourney, 
                   Integer seatsBooked, BigDecimal totalPrice) {
        this();
        this.train = train;
        this.customer = customer;
        this.dateOfJourney = dateOfJourney;
        this.seatsBooked = seatsBooked;
        this.totalPrice = totalPrice;
    }

    // Getters and Setters
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Train getTrain() {
        return train;
    }

    public void setTrain(Train train) {
        this.train = train;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public LocalDate getDateOfJourney() {
        return dateOfJourney;
    }

    public void setDateOfJourney(LocalDate dateOfJourney) {
        this.dateOfJourney = dateOfJourney;
    }

    public Integer getSeatsBooked() {
        return seatsBooked;
    }

    public void setSeatsBooked(Integer seatsBooked) {
        this.seatsBooked = seatsBooked;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "bookingId=" + bookingId +
                ", trainId=" + (train != null ? train.getTrainId() : null) +
                ", customerId=" + (customer != null ? customer.getCustomerId() : null) +
                ", dateOfJourney=" + dateOfJourney +
                ", seatsBooked=" + seatsBooked +
                ", status=" + status +
                ", totalPrice=" + totalPrice +
                ", bookingDate=" + bookingDate +
                '}';
    }
}