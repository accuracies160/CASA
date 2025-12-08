package com.casa.backend.budget;


import com.casa.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryBudgetService {

    private final CategoryBudgetRepository categoryRepo;
    private final BudgetRepository budgetRepository;

    /** 
     * Get all category budgets for the authenticated user.
     */
    public List<CategoryBudget> getCategoryBudgets(User user) {
        return categoryRepo.findAllByUser(user);
    }

    /**
     * Get all category budgets belonging to a specific budget.
     */
    public List<CategoryBudget> getCategoryBudgetsForBudget(Long budgetId, User user) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return categoryRepo.findAllByBudget(budget);
    }

    /**
     * Create a category budget inside a parent budget.
     */
    public CategoryBudget createCategoryBudget(User user, Long budgetId, CategoryBudget request) {

        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        if (!budget.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        CategoryBudget cb = CategoryBudget.builder()
                .category(request.getCategory())
                .maxAmount(request.getMaxAmount())
                .budget(budget)
                .user(user)
                .build();

        return categoryRepo.save(cb);
    }

    /**
     * Delete a category budget.
     */
    public void deleteCategoryBudget(User user, Long catId) {

        CategoryBudget cb = categoryRepo.findById(catId)
                .orElseThrow(() -> new RuntimeException("Category budget not found"));

        if (!cb.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        categoryRepo.delete(cb);
    }
}