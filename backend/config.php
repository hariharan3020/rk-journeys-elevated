<?php
// ── Database configuration ─────────────────────────────────────────────────
$isLocalDevelopment = in_array(
    $_SERVER['HTTP_HOST'] ?? '',
    ['localhost', '127.0.0.1', '127.0.0.1:8000', 'localhost:8000', '127.0.0.1:8080', 'localhost:8080'],
    true
);

define('DB_HOST', '127.0.0.1');
define('DB_USER', $isLocalDevelopment ? 'root' : 'u910074219_rk_tours');
define('DB_PASS', $isLocalDevelopment ? '' : 'Techinta@2026');
define('DB_NAME', $isLocalDevelopment ? 'rk_tours_and_travels' : 'u910074219_rk_tours');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );

    // ── Auto-create tables if they don't exist yet ─────────────────────────
    $pdo->exec("CREATE TABLE IF NOT EXISTS `users` (
        `id`         INT AUTO_INCREMENT PRIMARY KEY,
        `username`   VARCHAR(50)  NOT NULL UNIQUE,
        `password`   VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    $pdo->exec("CREATE TABLE IF NOT EXISTS `customer_reviews` (
        `id`         INT AUTO_INCREMENT PRIMARY KEY,
        `name`       VARCHAR(100) NOT NULL,
        `email`      VARCHAR(150) DEFAULT NULL,
        `role`       VARCHAR(100) DEFAULT NULL,
        `message`    TEXT NOT NULL,
        `rating`     TINYINT UNSIGNED NOT NULL DEFAULT 5,
        `status`     ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // ── Auto-seed default admin user if users table is empty ───────────────
    $userCount = (int)$pdo->query("SELECT COUNT(*) FROM `users`")->fetchColumn();
    if ($userCount === 0) {
        $stmt = $pdo->prepare("INSERT INTO `users` (`username`, `password`) VALUES (:u, :p)");
        $stmt->execute([
            'u' => 'admin',
            'p' => password_hash('admin123', PASSWORD_BCRYPT),
        ]);
    }

} catch (PDOException $e) {
    // Output structured JSON error so frontend shows a clear message
    if (!headers_sent()) {
        http_response_code(500);
        header("Content-Type: application/json; charset=UTF-8");
    }
    echo json_encode([
        "status"  => "error",
        "message" => "Database connection failed: " . $e->getMessage(),
    ]);
    exit;
}
?>
