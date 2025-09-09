package com.example.trainticket.repository;

import com.example.trainticket.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Train entity
 */
@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {

    /**
     * Find trains by source and destination
     */
    List<Train> findBySourceAndDestination(String source, String destination);

    /**
     * Find trains by source (case-insensitive)
     */
    List<Train> findBySourceIgnoreCase(String source);

    /**
     * Find trains by destination (case-insensitive)
     */
    List<Train> findByDestinationIgnoreCase(String destination);

    /**
     * Find trains by source containing text (case-insensitive)
     */
    List<Train> findBySourceContainingIgnoreCase(String source);

    /**
     * Find trains by destination containing text (case-insensitive)
     */
    List<Train> findByDestinationContainingIgnoreCase(String destination);

    /**
     * Find trains with available seats greater than specified number
     */
    List<Train> findBySeatsAvailableGreaterThan(Integer seats);

    /**
     * Custom query to search trains by source and/or destination with partial matching
     */
    @Query("SELECT t FROM Train t WHERE " +
           "(:source IS NULL OR LOWER(t.source) LIKE LOWER(CONCAT('%', :source, '%'))) AND " +
           "(:destination IS NULL OR LOWER(t.destination) LIKE LOWER(CONCAT('%', :destination, '%')))")
    List<Train> searchTrains(@Param("source") String source, @Param("destination") String destination);
}