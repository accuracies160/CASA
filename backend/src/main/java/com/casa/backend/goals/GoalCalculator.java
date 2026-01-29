package com.casa.backend.goals;

public class GoalCalculator {
    /**
     * Returns percentage progress toward a financial goal.
     * - If target <= 0 → return -1 (invalid)
     * - Caps the percent at 100
     */

    public static double calculateProgress(double current, double target) {
        
        if (target <= 0) {
            return -1;
        } else {
            double percent = (current / target) * 100;

            if (percent < 0) {
                return -1;
            } else {
                return Math.min(percent, 100);
            }
        }
    }
}


