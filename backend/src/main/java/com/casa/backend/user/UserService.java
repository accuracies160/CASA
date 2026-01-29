package com.casa.backend.user;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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

        /**
     * Retrieves the currently authenticated user based on the JWT token.
     * Spring Security stores the authenticated user's information inside the SecurityContext.
     */
    public User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String email;

        if (principal instanceof UserDetails userDetails) {
            // Spring Security uses the email as the username
            email = userDetails.getUsername();
        } else {
            // Fallback in rare cases
            email = principal.toString();
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
    }
}
