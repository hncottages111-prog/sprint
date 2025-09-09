package com.example.trainticket.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

/**
 * Train Entity representing train information
 */
@Entity
@Table(name = "train")
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "train_id")
    private Long trainId;

    @NotNull(message = "Train name is required")
    @Size(min = 2, max = 100, message = "Train name must be between 2 and 100 characters")
    @Column(name = "train_name", nullable = false, length = 100)
    private String trainName;

    @NotNull(message = "Source is required")
    @Size(min = 2, max = 50, message = "Source must be between 2 and 50 characters")
    @Column(name = "source", nullable = false, length = 50)
    private String source;

    @NotNull(message = "Destination is required")
    @Size(min = 2, max = 50, message = "Destination must be between 2 and 50 characters")
    @Column(name = "destination", nullable = false, length = 50)
    private String destination;

    @NotNull(message = "Departure time is required")
    @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Departure time must be in HH:MM format")
    @Column(name = "departure_time", nullable = false, length = 5)
    private String departureTime;

    @NotNull(message = "Arrival time is required")
    @Pattern(regexp = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$", message = "Arrival time must be in HH:MM format")
    @Column(name = "arrival_time", nullable = false, length = 5)
    private String arrivalTime;

    @NotNull(message = "Seats available is required")
    @Min(value = 0, message = "Seats available cannot be negative")
    @Max(value = 500, message = "Seats available cannot exceed 500")
    @Column(name = "seats_available", nullable = false)
    private Integer seatsAvailable;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @DecimalMax(value = "9999.99", message = "Price cannot exceed 9999.99")
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // Default constructor
    public Train() {}

    // Constructor with parameters
    public Train(String trainName, String source, String destination, String departureTime, 
                 String arrivalTime, Integer seatsAvailable, BigDecimal price) {
        this.trainName = trainName;
        this.source = source;
        this.destination = destination;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.seatsAvailable = seatsAvailable;
        this.price = price;
    }

    // Getters and Setters
    public Long getTrainId() {
        return trainId;
    }

    public void setTrainId(Long trainId) {
        this.trainId = trainId;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public Integer getSeatsAvailable() {
        return seatsAvailable;
    }

    public void setSeatsAvailable(Integer seatsAvailable) {
        this.seatsAvailable = seatsAvailable;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Train{" +
                "trainId=" + trainId +
                ", trainName='" + trainName + '\'' +
                ", source='" + source + '\'' +
                ", destination='" + destination + '\'' +
                ", departureTime='" + departureTime + '\'' +
                ", arrivalTime='" + arrivalTime + '\'' +
                ", seatsAvailable=" + seatsAvailable +
                ", price=" + price +
                '}';
    }
}