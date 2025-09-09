package com.example.trainticket.repository;

import com.example.trainticket.entity.Booking;
import com.example.trainticket.entity.Booking.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for Booking entity
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * Find bookings by customer ID
     */
    @Query("SELECT b FROM Booking b JOIN FETCH b.train JOIN FETCH b.customer WHERE b.customer.customerId = :customerId ORDER BY b.bookingDate DESC")
    List<Booking> findByCustomerId(@Param("customerId") Long customerId);

    /**
     * Find bookings by train ID
     */
    @Query("SELECT b FROM Booking b JOIN FETCH b.train JOIN FETCH b.customer WHERE b.train.trainId = :trainId")
    List<Booking> findByTrainId(@Param("trainId") Long trainId);

    /**
     * Find bookings by status
     */
    List<Booking> findByStatus(BookingStatus status);

    /**
     * Find bookings by date of journey
     */
    List<Booking> findByDateOfJourney(LocalDate dateOfJourney);

    /**
     * Find bookings by customer ID and status
     */
    @Query("SELECT b FROM Booking b JOIN FETCH b.train JOIN FETCH b.customer WHERE b.customer.customerId = :customerId AND b.status = :status ORDER BY b.bookingDate DESC")
    List<Booking> findByCustomerIdAndStatus(@Param("customerId") Long customerId, @Param("status") BookingStatus status);

    /**
     * Count total bookings for a train on a specific date
     */
    @Query("SELECT COALESCE(SUM(b.seatsBooked), 0) FROM Booking b WHERE b.train.trainId = :trainId AND b.dateOfJourney = :dateOfJourney AND b.status = 'CONFIRMED'")
    Integer countBookedSeatsForTrainOnDate(@Param("trainId") Long trainId, @Param("dateOfJourney") LocalDate dateOfJourney);

    /**
     * Find booking with train and customer details
     */
    @Query("SELECT b FROM Booking b JOIN FETCH b.train JOIN FETCH b.customer WHERE b.bookingId = :bookingId")
    Booking findByIdWithDetails(@Param("bookingId") Long bookingId);
}