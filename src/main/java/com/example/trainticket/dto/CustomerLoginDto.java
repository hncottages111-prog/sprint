package com.example.trainticket.dto;

import jakarta.validation.constraints.*;

/**
 * DTO for customer login
 */
public class CustomerLoginDto {

    @NotNull(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Password is required")
    @Size(min = 1, message = "Password cannot be empty")
    private String password;

    // Default constructor
    public CustomerLoginDto() {}

    // Constructor with parameters
    public CustomerLoginDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "CustomerLoginDto{" +
                "email='" + email + '\'' +
                ", password='[PROTECTED]'" +
                '}';
    }
}