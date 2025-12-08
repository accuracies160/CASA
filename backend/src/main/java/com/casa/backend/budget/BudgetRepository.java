package com.casa.backend.budget;

import com.casa.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    /**
     * Returns all budgets owned by a specific user.
     */
    List<Budget> findAllByUser(User user);
}
