package com.casa.backend.user;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Test
    void getByEmail_returnsUser() {
        UserRepository mockRepo = mock(UserRepository.class);

        User user = User.builder()
                .firstName("John")
                .lastName("Doe")
                .email("test@test.com")
                .passwordHash("hashed")
                .build();

        when(mockRepo.findByEmail("test@test.com"))
                .thenReturn(java.util.Optional.of(user));

        UserService service = new UserService(mockRepo);

        User result = service.getByEmail("test@test.com");

        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        assertEquals("test@test.com", result.getEmail());
    }

    @Test
    void getByEmail_throwsException_whenUserNotFound() {
        UserRepository mockRepo = mock(UserRepository.class);
        when(mockRepo.findByEmail("missing@test.com"))
                .thenReturn(java.util.Optional.empty());

        UserService service = new UserService(mockRepo);

        assertThrows(RuntimeException.class,
                () -> service.getByEmail("missing@test.com"));
    }
}
