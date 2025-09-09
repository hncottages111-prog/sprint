package com.example.trainticket.dto;

import java.time.LocalDateTime;

/**
 * Standard success response DTO
 */
public class SuccessResponseDto<T> {

    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    // Default constructor
    public SuccessResponseDto() {
        this.success = true;
        this.timestamp = LocalDateTime.now();
    }

    // Constructor with message
    public SuccessResponseDto(String message) {
        this();
        this.message = message;
    }

    // Constructor with message and data
    public SuccessResponseDto(String message, T data) {
        this(message);
        this.data = data;
    }

    // Static factory methods
    public static <T> SuccessResponseDto<T> of(String message) {
        return new SuccessResponseDto<>(message);
    }

    public static <T> SuccessResponseDto<T> of(String message, T data) {
        return new SuccessResponseDto<>(message, data);
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "SuccessResponseDto{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", data=" + data +
                ", timestamp=" + timestamp +
                '}';
    }
}