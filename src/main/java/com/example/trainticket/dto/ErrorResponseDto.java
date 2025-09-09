package com.example.trainticket.dto;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Standard error response DTO
 */
public class ErrorResponseDto {

    private boolean success;
    private String message;
    private String error;
    private int status;
    private String path;
    private LocalDateTime timestamp;
    private List<String> details;

    // Default constructor
    public ErrorResponseDto() {
        this.success = false;
        this.timestamp = LocalDateTime.now();
    }

    // Constructor with basic error info
    public ErrorResponseDto(String message, String error, int status, String path) {
        this();
        this.message = message;
        this.error = error;
        this.status = status;
        this.path = path;
    }

    // Constructor with validation details
    public ErrorResponseDto(String message, String error, int status, String path, List<String> details) {
        this(message, error, status, path);
        this.details = details;
    }

    // Static factory methods
    public static ErrorResponseDto of(String message, String error, int status, String path) {
        return new ErrorResponseDto(message, error, status, path);
    }

    public static ErrorResponseDto of(String message, String error, int status, String path, List<String> details) {
        return new ErrorResponseDto(message, error, status, path, details);
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

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public List<String> getDetails() {
        return details;
    }

    public void setDetails(List<String> details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return "ErrorResponseDto{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", error='" + error + '\'' +
                ", status=" + status +
                ", path='" + path + '\'' +
                ", timestamp=" + timestamp +
                ", details=" + details +
                '}';
    }
}