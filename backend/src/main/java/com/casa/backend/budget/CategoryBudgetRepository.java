package com.casa.backend.budget;

import com.casa.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CategoryBudgetRepository extends JpaRepository<CategoryBudget, Long> {
    List<CategoryBudget> findAllByBudget(Budget budget);

    List<CategoryBudget> findAllByUser(User user);
}