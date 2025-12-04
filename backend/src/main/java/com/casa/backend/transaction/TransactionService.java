package com.casa.backend.transaction;

import com.casa.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    /**
     * Custom CSV date format: MM/dd/yyyy
     * Example: 12/03/2025
     */
    private final DateTimeFormatter csvFormatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");

    /**
     * Saves a single transaction for a given user.
     */
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    /**
     * Gets all transactions belonging to a specific user.
     */
    public List<Transaction> getTransactionsForUser(User user) {
        return transactionRepository.findAllByUser(user);
    }

    /**
     * Parses a date string and supports both:
     *   - ISO format: yyyy-MM-dd
     *   - Custom CSV format: MM/dd/yyyy
     */
    private LocalDate parseDate(String raw) {
        raw = raw.trim();

        // Try ISO format first (yyyy-MM-dd)
        try {
            return LocalDate.parse(raw);
        } catch (Exception ignored) {}

        // Try MM/dd/yyyy next
        try {
            return LocalDate.parse(raw, csvFormatter);
        } catch (Exception ignored) {}

        // Neither worked → error
        throw new RuntimeException("Invalid date format: " + raw);
    }

    /**
     * Processes and saves transactions from a CSV file.
     * Expected CSV format (either):
     *   2025-01-01, Starbucks, Food, -4.75
     *   or
     *   12/03/2025, Starbucks, Food, -4.75
     */
    public void processCSV(MultipartFile file, User user) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

            String line = br.readLine(); // read first line

            // If the first line does NOT start with a number → assume it's a header row
            if (line != null && !line.matches("^[0-9].*")) {
            line = br.readLine();  // move to next real line
            }

            while (line != null) {
                String[] fields = line.split(",");

                LocalDate date = parseDate(fields[0]); // Use new multi-format parser

                Transaction t = Transaction.builder()
                        .user(user)
                        .date(date)
                        .description(fields[1].trim())
                        .category(fields[2].trim())
                        .amount(new BigDecimal(fields[3].trim()))
                        .build();

                transactionRepository.save(t);

                line = br.readLine();
            }

        } catch (Exception e) {
            throw new RuntimeException("Error processing CSV file: " + e.getMessage(), e);
        }
    }
}
