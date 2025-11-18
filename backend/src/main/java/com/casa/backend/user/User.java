package com.casa.backend.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Represents a user within the system. This class is responsible for mapping to the "users" table
 * established in the database and implementing the UserDetails interface so Spring Security
 * can use it when a user attempts to log in.
 */
@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User implements UserDetails {

    /**
     * The automatically generated unique ID for the user.
     */
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user's email. The email must be unique and cannot be null.
     */
    @Column(unique = true, nullable = false)
    private String email;

    /**
     * The hashed version of the user's password.
     */
    @Column(nullable = false)
    private String passwordHash;

    /**
     * The display name that the user has chosen and that will be displayed after a user has logged in.
     */
    private String displayName;

    /**
     * Responsible for returning the user's granted authorities. Due to the fact that roles are 
     * not implemented yet, this ultimately returns an empty list.
     * 
     * @return Empty list of authorities.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    /**
     * Returns the user's hashed password to be authenticated.
     * 
     * @return The password hash.
     */
    @Override
    public String getPassword() {
        return passwordHash;
    }

    /**
     * Returns the user's username that is used during login, which is the user's email.
     * 
     * @return User's email.
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Shows whether or not the account is expired. As of now, this will always return true
     * as account expiration is not being used and has not been implemented yet.
     * 
     * @return true.
     */
    @Override
    public boolean isAccountNonExpired() { 
        return true; 
    }

    /**
     * Shows whether or not the account is locked. As of now, this will always return true
     * as account locking is not being used and has not been implemented yet.
     * 
     * @return true.
     */
    @Override
    public boolean isAccountNonLocked() { 
        return true; 
    }

    /**
     * Shows whether or not a user's credentials are expired. As of now, this will always return true
     * as credential expiration is not being used and has not been implemented yet.
     * 
     * @return true.
     */
    @Override
    public boolean isCredentialsNonExpired() { 
        return true; 
    }

    /**
     * Shows whether or not the user's account is enabled. As of now, this will always return true
     * as account disabling is not being used and has not been implemented yet. 
     * 
     * @return true.
     */
    @Override
    public boolean isEnabled() { 
        return true; 
    }
}
