package com.casa.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * Represents the login request that is sent from the frontend when a user attempts to log in.
 * This record essentially stores the user's email and password and also
 * validates that the inputted information is not empty and that the entered email is in the correct
 * format for an email.
 * 
 * @param email The user's email. 
 * @param password The user's password.
 */

public record LoginRequest(@Email String email, @NotBlank String password) {}
