package com.casa.backend.transaction;


import com.casa.backend.user.User;
import com.casa.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;
    private final UserService userService;

    /**
     * Uploads a CSV file and saves transactions for the logged-in user
     */
    @PostMapping("/upload")
    public ResponseEntity<?> uploadCSV(@RequestParam("file") MultipartFile file, Principal principal) {
            
        // Get the logged-in user based on their email (principal.getName())
        User user = userService.getByEmail(principal.getName());

        transactionService.processCSV(file, user);

        return ResponseEntity.ok("Transactions uploaded successfully.");
        }

        @PostMapping("/add")
        public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction, Principal principal) {
            User user = userService.getByEmail(principal.getName());

            transaction.setUser(user); // associate user
        
            transactionService.saveTransaction(transaction);
        
            return ResponseEntity.ok("Transaction saved successfully.");
        }

        /**
         * Returns all transactions for the logged-in user.
         */
        @GetMapping
        public ResponseEntity<List<Transaction>> getUserTransactions(Principal principal) {

            User user = userService.getByEmail(principal.getName());

            List<Transaction> transactions = transactionService.getTransactionsForUser(user);

            return ResponseEntity.ok(transactions);
        }
    }
