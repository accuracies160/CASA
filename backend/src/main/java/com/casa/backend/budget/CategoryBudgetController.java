package com.casa.backend.budget;

import com.casa.backend.user.User;
import com.casa.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category-budgets")
@RequiredArgsConstructor
public class CategoryBudgetController {

    private final CategoryBudgetService service;
    private final UserService userService;

    @GetMapping
    public List<CategoryBudget> getUserCategoryBudgets() {
        User user = userService.getAuthenticatedUser();
        return service.getCategoryBudgets(user);
    }

    @GetMapping("/budget/{budgetId}")
    public List<CategoryBudget> getForBudget(@PathVariable Long budgetId) {
        User user = userService.getAuthenticatedUser();
        return service.getCategoryBudgetsForBudget(budgetId, user);
    }

    @PostMapping("/budget/{budgetId}")
    public CategoryBudget create(@PathVariable Long budgetId,
                                 @RequestBody CategoryBudget req) {
        User user = userService.getAuthenticatedUser();
        return service.createCategoryBudget(user, budgetId, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        User user = userService.getAuthenticatedUser();
        service.deleteCategoryBudget(user, id);
    }
}