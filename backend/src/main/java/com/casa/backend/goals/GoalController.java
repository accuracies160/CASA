package com.casa.backend.goals;

import com.casa.backend.user.User;
import com.casa.backend.user.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor

public class GoalController {

    private final GoalService goalService;
    private final UserService userService;

    @GetMapping
    public List<Goal> getGoals() {
        User user = userService.getAuthenticatedUser();
        return goalService.getGoals(user);
    }

    @PostMapping
    public Goal createGoal(@RequestBody GoalRequest request) {
        User user = userService.getAuthenticatedUser();
        return goalService.createGoal(user, request);
    }

    @PutMapping("/{id}")
    public Goal updateGoal(@PathVariable Long id, @RequestBody GoalRequest request) {
        User user = userService.getAuthenticatedUser();
        return goalService.updateGoal(user, id, request.getCurrentAmount());
    }

    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id) {
        User user = userService.getAuthenticatedUser();
        goalService.deleteGoal(user, id);
    }

}



