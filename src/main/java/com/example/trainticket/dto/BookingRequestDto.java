package com.example.trainticket.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

/**
 * DTO for booking request
 */
public class BookingRequestDto {

    @NotNull(message = "Train ID is required")
    @Min(value = 1, message = "Train ID must be a positive number")
    private Long trainId;

    @NotNull(message = "Customer ID is required")
    @Min(value = 1, message = "Customer ID must be a positive number")
    private Long customerId;

    @NotNull(message = "Date of journey is required")
    @Future(message = "Date of journey must be in the future")
    private LocalDate dateOfJourney;

    @NotNull(message = "Number of seats is required")
    @Min(value = 1, message = "At least 1 seat must be booked")
    @Max(value = 10, message = "Cannot book more than 10 seats at once")
    private Integer seatsBooked;

    // Default constructor
    public BookingRequestDto() {}

    // Constructor with parameters
    public BookingRequestDto(Long trainId, Long customerId, LocalDate dateOfJourney, Integer seatsBooked) {
        this.trainId = trainId;
        this.customerId = customerId;
        this.dateOfJourney = dateOfJourney;
        this.seatsBooked = seatsBooked;
    }

    // Getters and Setters
    public Long getTrainId() {
        return trainId;
    }

    public void setTrainId(Long trainId) {
        this.trainId = trainId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
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

    @Override
    public String toString() {
        return "BookingRequestDto{" +
                "trainId=" + trainId +
                ", customerId=" + customerId +
                ", dateOfJourney=" + dateOfJourney +
                ", seatsBooked=" + seatsBooked +
                '}';
    }
}