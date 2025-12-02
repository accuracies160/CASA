package com.casa.backend.auth;

import com.casa.backend.user.User;
import com.casa.backend.user.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Controller that is responsible for handling the authenticating user actions and input
 * inlcuding user sign up and log in.
 * Provides REST endpoints that collaborate with the UserRepository, PasswordEncoder, and 
 * Spring Security's AuthenticationManager.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    /** Repository that is used to interact with stored user data and information */
    private final UserRepository users;

    /** Encoder that is used to hash and validate users passwords */
    private final PasswordEncoder encoder;

    /** Authentication manager that is used by Spring Security to authenticate and validate login attemps. */
    private final AuthenticationManager auth;

    // Signup

    /**
     * Responsible for user singup. This method checks if the user's entered email already exists within the database and if it doesn't,
     * the email is stored, the user's entered password is hashed, and a new User object is created and saved to the database. 
     * 
     * @param r The singup request which includes the user's email, password, and display name.
     * @return A success message is returned if the user's account is created and stored successfully, or an error
     * message is returned if the email is already in the database.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest r) {

        if (users.findByEmail(r.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User newUser = new User();
        newUser.setEmail(r.email());
        newUser.setPasswordHash(encoder.encode(r.password()));
        newUser.setDisplayName(r.displayName());

        users.save(newUser);

        return ResponseEntity.ok("Signup successful");
    }

    // Login

    /**
     * Responsible for user login. Thi method uses Spring Security to authenticate and validate the user's
     * entered email and password. If the attempted login is successful, a success message is returned that contains the user's
     * display name.
     * 
     * @param r The login request which includes the user's email and password.
     * @return A success message containing the user's display name is returned if the attempted login is successful.
     * @throws org.springframework.security.core.AuthenticationException if the user's entered email and password
     * is incorrect.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r) {
        try {
            auth.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            r.email(),
                            r.password()
                    )
            );
    
            User u = users.findByEmail(r.email()).orElseThrow();
    
            return ResponseEntity.ok("Login successful for user: " + u.getDisplayName());
    
        } catch (Exception e) {
            // Authentication failed
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }
    }    
}
