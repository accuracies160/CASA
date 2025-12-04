package com.casa.backend.user;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    // Test 1: User exists
    @Test
    void returns_user_when_found() {
        User u = User.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .email("test@example.com")
                .passwordHash("hashed")
                .build();

        when(userRepository.findByEmail("test@example.com"))
                .thenReturn(Optional.of(u));

        User result = userService.getByEmail("test@example.com");

        assertEquals("test@example.com", result.getEmail());
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());

        verify(userRepository, times(1)).findByEmail("test@example.com");
    }
    
    // Test 2: User not found
    @Test
    void throws_exception_when_user_not_found() {

        when(userRepository.findByEmail("missing@example.com"))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(
                RuntimeException.class,
                () -> userService.getByEmail("missing@example.com")
        );

        assertTrue(ex.getMessage().contains("User not found"));
        verify(userRepository, times(1)).findByEmail("missing@example.com");
    }
}
