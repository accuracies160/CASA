package com.casa.backend.budget;

import com.casa.backend.user.User;
import com.casa.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;
    private final UserService userService;

    @GetMapping
    public List<Budget> getBudgets() {
        User user = userService.getAuthenticatedUser();
        return budgetService.getBudgetsForUser(user);
    }

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        User user = userService.getAuthenticatedUser();
        return budgetService.createBudget(user, budget);
    }

    @DeleteMapping("/{id}")
    public void deleteBudget(@PathVariable Long id) {
        User user = userService.getAuthenticatedUser();
        budgetService.deleteBudget(user, id);
    }
}
