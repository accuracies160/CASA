package com.casa.backend.transaction;

import com.casa.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

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

    private final DateTimeFormatter csvFormatter =
            DateTimeFormatter.ofPattern("MM/dd/yyyy");

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }


    @Transactional
    public void deleteTransactionsBulk(List<Long> ids, User user) {
        transactionRepository.deleteAllByIdInAndUser(ids, user);
    }

    public List<Transaction> getTransactionsForUser(User user) {
        return transactionRepository.findAllByUser(user);
    }

    public void processCSV(MultipartFile file, User user) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

            String line = br.readLine();

            // --- Determine if the first line is a header ---
            boolean hasHeader = line != null && line.toLowerCase().contains("date");

            // If no header, process first line
            if (!hasHeader && line != null) {
                processCsvLine(line, user);
            }

            // Process remaining lines
            while ((line = br.readLine()) != null) {
                processCsvLine(line, user);
            }

        } catch (Exception e) {
            throw new RuntimeException("Error processing CSV: " + e.getMessage(), e);
        }
    }

    private void processCsvLine(String line, User user) {
        String[] fields = line.split(",", -1);

        LocalDate date = LocalDate.parse(fields[0].trim(), csvFormatter);

        Transaction t = Transaction.builder()
                .user(user)
                .date(date)
                .description(fields[1].trim())
                .category(fields[2].trim())
                .amount(new BigDecimal(fields[3].trim()))
                .build();

        transactionRepository.save(t);
    }
}
