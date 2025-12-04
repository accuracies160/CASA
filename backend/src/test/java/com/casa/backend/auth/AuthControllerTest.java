package com.casa.backend.auth;

import com.casa.backend.user.User;
import com.casa.backend.user.UserRepository;
import org.junit.jupiter.api.Test;
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

    /* ------------------- SIGNUP TESTS ------------------- */

    @Test
    void signup_successful() {
        SignupRequest req = new SignupRequest(
                "John",
                "Doe",
                "test@test.com",
                "pass"
        );

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
        SignupRequest req = new SignupRequest(
                "John",
                "Doe",
                "test@test.com",
                "pass"
        );

        when(users.findByEmail("test@test.com"))
                .thenReturn(Optional.of(new User()));

        ResponseEntity<?> response = controller.signup(req);

        assertEquals(400, response.getStatusCode().value());
        assertEquals("Email already exists", response.getBody());
        verify(users, never()).save(any());
    }

    /* -------------------- LOGIN TESTS ------------------- */

    @Test
    void login_successful() {
        LoginRequest req = new LoginRequest("user@test.com", "123");

        User u = new User();
        u.setFirstName("John");
        u.setLastName("Doe");
        u.setEmail("user@test.com");

        when(users.findByEmail("user@test.com"))
                .thenReturn(Optional.of(u));

        when(auth.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(mock(org.springframework.security.core.Authentication.class));

        ResponseEntity<?> response = controller.login(req);

        assertEquals(200, response.getStatusCode().value());

        // cast response to AuthResponse
        AuthResponse body = (AuthResponse) response.getBody();

        assertNotNull(body);
        assertEquals("John", body.firstName());
        assertEquals("Doe", body.lastName());
        assertEquals("user@test.com", body.email());
    }

    @Test
    void login_fails_invalid_credentials() {
        LoginRequest req = new LoginRequest("user@test.com", "wrong");

        doThrow(new RuntimeException("Bad credentials"))
                .when(auth).authenticate(any());

        ResponseEntity<?> response = controller.login(req);

        assertEquals(401, response.getStatusCode().value());
        assertEquals("Invalid email or password", response.getBody());
    }
}
