package com.casa.backend.goals;

import com.casa.backend.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private BigDecimal currentAmount;

    private BigDecimal targetAmount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
