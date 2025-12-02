package com.casa.backend.transaction;

import com.casa.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for performing CRUD operations on transactions.
 * Spring Data JPA automatically implements all basic operations.
 */
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    /**
     * Retrieves all transaction that belong to a specific user.
     * 
     * @param user The user whose transactions should be returned
     * @return A list of transacitons belonging to the user.
     */
    List<Transaction> findAllByUser(User user);
}
