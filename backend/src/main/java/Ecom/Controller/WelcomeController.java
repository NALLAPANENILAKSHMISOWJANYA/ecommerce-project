package Ecom.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@RestController
public class WelcomeController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/")
    public ResponseEntity<String> welcome() {
        return ResponseEntity.ok("Welcome to eCommerce Platform API! Server is running successfully.");
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Server is healthy and running!");
    }

    @GetMapping("/fixdb")
    public ResponseEntity<String> fixdb() {
        try {
            jdbcTemplate.execute("ALTER TABLE products ALTER COLUMN imageurl TYPE VARCHAR(2000);");
            jdbcTemplate.execute("ALTER TABLE products ALTER COLUMN description TYPE VARCHAR(2000);");
            return ResponseEntity.ok("Database schema updated successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating schema: " + e.getMessage());
        }
    }
}