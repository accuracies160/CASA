package com.casa.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

/**
 * Responsible for setting up authentication configurations for the backend.
 * This class provides the AuthenticationManager used by Spring Security to handle and process user login.
 */
@Configuration
@RequiredArgsConstructor
public class AuthConfig {

    /**
     * Creates and provides the AuthenticationManager used by Spring Security for login.
     * Spring Security uses this to authenticate user information when a
     * user attempts to log in.
     * 
     * @param config The authentication configuration that is provided by Spring Security.
     * @return The AuthenticationManager used to authenticate user information.
     * @throws Exception If the AuthenticationManager is unable to be created.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
