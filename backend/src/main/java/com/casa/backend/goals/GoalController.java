package com.casa.backend.goals;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalCalculator calculator = new GoalCalculator();

    @GetMapping("/progress")
    public ResponseEntity<?> getProgress(@RequestParam double current, @RequestParam double target) {
        
        double percent = calculator.calculateProgress(current, target);
        return ResponseEntity.ok(percent);
    }
}



