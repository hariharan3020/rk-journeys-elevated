<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', '
u910074219_rk_tours'); // Replace with database username
define('DB_PASS', 'Techinta@2026');     // Replace with database password
define('DB_NAME', '
u910074219_rk_tours');

try {
    // Create PDO connection
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    // In production, log the error and display a user-friendly message.
    // For development, we display the error message.
    die("Database connection failed: " . $e->getMessage());
}
?>
