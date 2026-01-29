package com.casa.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Responsible for configuring CORS (Cross-Origin Resource Sharing) settings for the backend.
 * This allows the frontend (on localhost:5173) to send requests to the backend during development, enabling us to see if the backend 
 * and it's different functionalites are working properly.
 */
@Configuration
public class CorsConfig {

    /**
     * Sets up the CORS rules so the frontend can send HTTP requests
     * to the backend without it being blocked.
     *  
     * @return A WebMvcConfigurer that has the CORS configuration and rules
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
