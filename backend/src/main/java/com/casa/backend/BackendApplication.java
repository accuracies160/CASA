package com.casa.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the backend. This class is responsible for starting the Spring Boot
 * application and loading all the backend configurations.
 */
@SpringBootApplication
public class BackendApplication {

    /**
     * Launches the backend via running the Spring Boot Application.
     * 
     * @param args Command-line arguments passed when the application is started.
     */
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
}
