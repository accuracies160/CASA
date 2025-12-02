package com.casa.backend.transaction;

import com.casa.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    /**
     * Saves a single transaction for a given user.
     */
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    /**
     * Gets all transactions belonging to a specific user
     */
    public List<Transaction> getTransactionsForUser(User user) {
        return transactionRepository.findAllByUser(user);
    }

    /**
     * Processes and saves transactions from a CSV file.
     * Expected CSV format:
     * date, description, category, amount
     * 2025-01-01, Starbucks, Food, -4.75
     */
    public void processCSV(MultipartFile file, User user) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line = br.readLine();

            while ((line = br.readLine()) != null) {
                String [] fields = line.split(",");

                Transaction t = Transaction.builder().user(user).date(LocalDate.parse(fields[0].trim())).description(fields[1].trim()).category(fields[2].trim()).amount(new BigDecimal(fields[3].trim())).build();

                transactionRepository.save(t);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error processing CSV file: " + e.getMessage(), e);
        }
    }
}
