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

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository users;
    private final AuthenticationManager auth;
    private final JwtService jwt;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest r) {
        auth.authenticate(new UsernamePasswordAuthenticationToken(r.email(), r.password()));
        User u = users.findByEmail(r.email()).orElseThrow();
        String token = jwt.generateToken(
                u.getEmail(),
                Map.of("uid", u.getId(), "name", u.getDisplayName())
        );
        return ResponseEntity.ok(Map.of("token", token));
    }
}
