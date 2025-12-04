package com.casa.backend.auth;

/**
 * Represents the signup request that is sent from the frontend when a user attempts to sign up and create an account.
 * The record stores the user's entered email, password, and desird display name.
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
