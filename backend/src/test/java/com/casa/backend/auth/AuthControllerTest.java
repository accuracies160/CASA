package com.casa.backend.auth;

import com.casa.backend.user.User;
import com.casa.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    private final UserRepository users = mock(UserRepository.class);
    private final PasswordEncoder encoder = mock(PasswordEncoder.class);
    private final AuthenticationManager auth = mock(AuthenticationManager.class);

    private final AuthController controller =
            new AuthController(users, encoder, auth);

    // Signup Tests
    @Test
    void signup_successful() {
        SignupRequest req = new SignupRequest("test@test.com", "pass", "John");

        when(users.findByEmail("test@test.com"))
                .thenReturn(Optional.empty());
        when(encoder.encode("pass"))
                .thenReturn("hashed");

        ResponseEntity<?> response = controller.signup(req);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Signup successful", response.getBody());

        verify(users, times(1)).save(any(User.class));
    }

    @Test
    void signup_fails_email_exists() {
        SignupRequest req = new SignupRequest("test@test.com", "pass", "John");

        when(users.findByEmail("test@test.com"))
                .thenReturn(Optional.of(new User()));

        ResponseEntity<?> response = controller.signup(req);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Email already exists", response.getBody());

        verify(users, never()).save(any());
    }
    // Login Tests
        @Test
        void login_successful() {
            LoginRequest req = new LoginRequest("user@test.com", "123");

            User u = new User();
            u.setDisplayName("John");

            when(users.findByEmail("user@test.com"))
                    .thenReturn(Optional.of(u));

            // mock successful authentication
            when(auth.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                    .thenReturn(mock(org.springframework.security.core.Authentication.class));

            ResponseEntity<?> response = controller.login(req);

            assertEquals(200, response.getStatusCode().value());
            assertEquals("Login successful for user: John", response.getBody());
        }


    @Test
    void login_fails_invalid_credentials() {
        LoginRequest req = new LoginRequest("user@test.com", "wrong");

        // authentication throws exception
        doThrow(new RuntimeException("Bad credentials"))
                .when(auth).authenticate(any());

        ResponseEntity<?> response = controller.login(req);

        assertEquals(401, response.getStatusCode().value());
        assertEquals("Invalid email or password", response.getBody());
    }
}
