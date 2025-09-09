package com.example.trainticket.repository;

import com.example.trainticket.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for Customer entity
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /**
     * Find customer by email address
     */
    Optional<Customer> findByEmail(String email);

    /**
     * Check if customer exists by email
     */
    boolean existsByEmail(String email);

    /**
     * Find customer by phone number
     */
    Optional<Customer> findByPhoneNumber(String phoneNumber);

    /**
     * Check if customer exists by phone number
     */
    boolean existsByPhoneNumber(String phoneNumber);
}