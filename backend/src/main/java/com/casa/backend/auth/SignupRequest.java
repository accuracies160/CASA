package com.casa.backend.auth;

/**
 * Represents the signup request that is sent from the frontend when a user attempts to sign up and create an account.
 * The record stores the user's entered email, password, and desird display name.
 * 
 * @param email The user's entered email.
 * @param password The user's entered password.
 * @param displayName The name that will be shown for the user after logging in.
 */

public record SignupRequest(
        String email,
        String password,
        String displayName
) {}
