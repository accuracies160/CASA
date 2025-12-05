package com.casa.backend.auth;

/**
 * Represents the signup request sent from the frontend when a user
 * creates an account. This record now collects first name, last name,
 * email, and password.
 *
 * @param firstName The user's first name.
 * @param lastName The user's last name.
 * @param email The user's email (must be unique).
 * @param password The user's chosen password.
 */
public record SignupRequest(
        String firstName,
        String lastName,
        String email,
        String password
) {}
