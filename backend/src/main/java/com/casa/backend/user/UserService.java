package com.casa.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Retrieves a user by their email.
     * Used during login and when fetching the logged-in user's data
     */
    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}
