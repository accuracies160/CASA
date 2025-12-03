package com.casa.backend.transaction;

import com.casa.backend.user.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TransactionServiceTest {

    @Mock
    private TransactionRepository repo;

    private TransactionService service;

    TransactionServiceTest() {
        MockitoAnnotations.openMocks(this);
        service = new TransactionService(repo);
    }

    @Test
    void saveTransaction_success() {
        Transaction t = new Transaction();
        when(repo.save(t)).thenReturn(t);

        Transaction result = service.saveTransaction(t);

        assertEquals(t, result);
        verify(repo, times(1)).save(t);
    }

    @Test
    void processCSV_success() throws Exception {

        // Example CSV content
        String csv =
                "date,description,category,amount\n" +
                "2025-01-01,Starbucks,Food,-4.75\n" +
                "2025-01-02,Salary,Income,3000\n";

        MultipartFile mockFile = mock(MultipartFile.class);
        when(mockFile.getInputStream())
                .thenReturn(new ByteArrayInputStream(csv.getBytes()));

        User user = new User();
        service.processCSV(mockFile, user);

        // Should save 2 transactions
        verify(repo, times(2)).save(any(Transaction.class));
    }

    @Test
    void processCSV_throwsException() throws Exception {
        MultipartFile mockFile = mock(MultipartFile.class);

        // make getInputStream throw exception
        when(mockFile.getInputStream())
                .thenThrow(new RuntimeException("bad file"));

        User user = new User();

        RuntimeException ex = assertThrows(RuntimeException.class, () ->
                service.processCSV(mockFile, user)
        );

        assertTrue(ex.getMessage().contains("Error processing CSV"));
    }
}
