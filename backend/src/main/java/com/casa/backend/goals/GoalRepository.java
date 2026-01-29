package com.casa.backend.goals;

import com.casa.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepository extends JpaRepository <Goal, Long> {
    List<Goal> findAllByUser(User user);
}
