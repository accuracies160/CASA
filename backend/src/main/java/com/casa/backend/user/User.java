package com.casa.backend.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;

/**
 * Represents a user in the system.
 * Maps directly to the "users" table in the database.
 */
@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User implements UserDetails {

    /** Auto-generated primary key */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The user's first name (required) */
    @Column(name = "first_name", nullable = false)
    private String firstName;

    /** The user's last name (required) */
    @Column(name = "last_name", nullable = false)
    private String lastName;

    /** The user's email (unique + required) */
    @Column(unique = true, nullable = false)
    private String email;

    /** The Bcrypt-hashed version of the user's password */
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    /** Optional profile image URL */
    @Column(name = "profile_image_url")
    private String profileImageUrl;

    /* ----------------------- Spring Security ----------------------- */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(); // No roles yet
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    /** Username for Spring Security = email */
    @Override
    public String getUsername() {
        return email;
    }

    @Override public boolean isAccountNonExpired()  { return true; }
    @Override public boolean isAccountNonLocked()   { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled()            { return true; }
}
