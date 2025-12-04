package com.casa.backend.auth;

import com.casa.backend.security.JwtService;
import com.casa.backend.user.User;
import com.casa.backend.user.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

<<<<<<< Updated upstream
import java.util.Map;

=======
/**
 * Controller responsible for signup and login authentication.
 */
>>>>>>> Stashed changes
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository users;
<<<<<<< Updated upstream
=======
    private final PasswordEncoder encoder;
>>>>>>> Stashed changes
    private final AuthenticationManager auth;
    private final JwtService jwt;

<<<<<<< Updated upstream
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r) {
        auth.authenticate(new UsernamePasswordAuthenticationToken(r.email(), r.password()));
        User u = users.findByEmail(r.email()).orElseThrow();
        String token = jwt.generateToken(
                u.getEmail(),
                Map.of("uid", u.getId(), "name", u.getDisplayName())
        );
        return ResponseEntity.ok(Map.of("token", token));
=======
    /* --------------------------- SIGNUP --------------------------- */

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest r) {

        if (users.findByEmail(r.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User newUser = new User();
        newUser.setFirstName(r.firstName());
        newUser.setLastName(r.lastName());
        newUser.setEmail(r.email());
        newUser.setPasswordHash(encoder.encode(r.password()));

        users.save(newUser);

        return ResponseEntity.ok("Signup successful");
    }

    /* --------------------------- LOGIN --------------------------- */

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

            // Return JSON instead of plain text
            return ResponseEntity.ok(
                    new AuthResponse(
                            u.getFirstName(),
                            u.getLastName(),
                            u.getEmail()
                    )
            );

        } catch (Exception e) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }
>>>>>>> Stashed changes
    }
}
