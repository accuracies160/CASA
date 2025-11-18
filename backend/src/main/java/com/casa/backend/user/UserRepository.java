package com.casa.backend.user;
import org.springframework.data.jpa.repository.JpaRepository; import java.util.Optional;

/**
 * Repository interface that is responsible for interacting with the User table in the database.
 * This provides built-in CRUD operations through JpaRepository and
 * also includes a method that is responsible for finding a user by their email.
 */
public interface UserRepository extends JpaRepository<User, Long> { 

    /**
     * Find a user by their email.
     * 
     * @param email The email that is being searched for.
     * @return An Optional containing the user if they are found, or empty if they are not found.
     */
    Optional<User> findByEmail(String email); 
}
