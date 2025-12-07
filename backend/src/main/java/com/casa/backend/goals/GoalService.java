package com.casa.backend.goals;

import com.casa.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {
    
    private final GoalRepository goalRepository;

    public List<Goal> getGoals(User user) {
        return goalRepository.findAllByUser(user);
    }
    
    public Goal createGoal(User user, GoalRequest request) {
        Goal goal = Goal.builder()
                .name(request.getName())
                .currentAmount(request.getCurrentAmount())
                .targetAmount(request.getTargetAmount())
                .user(user)
                .build();

        return goalRepository.save(goal);
    }

    public Goal updateGoal(User user, Long goalId, BigDecimal newAmount) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        goal.setCurrentAmount(newAmount);
        return goalRepository.save(goal);
    }

    public void deleteGoal(User user, Long goalId) {
        Goal goal = goalRepository.findById(goalId)
        .orElseThrow(() -> new RuntimeException("Goal not found"));    
    
        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        goalRepository.delete(goal);
    }
}
