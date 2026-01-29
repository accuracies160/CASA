package com.casa.backend.goals;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class GoalRequest {
    private String name;
    private BigDecimal currentAmount;
    private BigDecimal targetAmount;
}
