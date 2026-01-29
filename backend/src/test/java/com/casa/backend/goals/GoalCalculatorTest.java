package com.casa.backend.goals;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class GoalCalculatorTest {

    @Test
    void calculates_normal_progress() {
        double result = GoalCalculator.calculateProgress(50, 100);
        assertEquals(50.0, result);
    }

    @Test
    void caps_progress_at_100() {
        double result = GoalCalculator.calculateProgress(200, 100);
        assertEquals(100.0, result);
    }

    @Test
    void returns_negative_for_invalid_target() {
        double result = GoalCalculator.calculateProgress(50, 0);
        assertEquals(-1, result);
    }

    @Test
    void returns_negative_for_negative_progress() {
        double result = GoalCalculator.calculateProgress(-10, 100);
        assertEquals(-1, result);
    }
}
