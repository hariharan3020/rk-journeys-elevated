<?php
// Public endpoint — customers submit their reviews from the website
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only POST requests are allowed."]);
    exit;
}

require_once __DIR__ . '/config.php';

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST;
}

// ── Validation ────────────────────────────────────────────────────────────────
$name    = isset($data['name'])    ? trim($data['name'])    : '';
$email   = isset($data['email'])   ? trim($data['email'])   : '';
$role    = isset($data['role'])    ? trim($data['role'])    : '';
$message = isset($data['message']) ? trim($data['message']) : '';
$rating  = isset($data['rating'])  ? (int)$data['rating']  : 5;

if (empty($name) || strlen($name) > 100) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name is required and must be under 100 characters."]);
    exit;
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    exit;
}

if (empty($message) || strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Review message must be at least 10 characters."]);
    exit;
}

if ($rating < 1 || $rating > 5) {
    $rating = 5;
}

// Auto-create table if missing (failsafe)
try {
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

    // Seed the 5 existing frontend testimonials if the table is still empty
    $rowCount = $pdo->query("SELECT COUNT(*) FROM `customer_reviews`")->fetchColumn();
    if ((int)$rowCount === 0) {
        $pdo->exec("INSERT INTO `customer_reviews` (`name`, `role`, `message`, `rating`, `status`) VALUES
            ('Arjun Ramesh',   'Business Traveler', 'Punctual, clean cars and courteous drivers. RK is my go-to for airport runs.',                5, 'approved'),
            ('Priya Sundaram', 'Family Trip',       'Our Ooty trip was stress-free. The driver was patient and knew every scenic stop.',            5, 'approved'),
            ('Vikram N.',      'Corporate Client',  'We use RK for all executive travel. Reliability and pricing are unmatched.',                   5, 'approved'),
            ('Meera Krishnan', 'Temple Tour',       'Rameshwaram darshan was seamless. Comfortable ride and thoughtful planning.',                  5, 'approved'),
            ('Rahul Iyer',     'Wedding',           'Fleet arrived on time, immaculately maintained. Guests were impressed.',                       5, 'approved')
        ");
    }

    $stmt = $pdo->prepare(
        "INSERT INTO `customer_reviews` (`name`, `email`, `role`, `message`, `rating`, `status`)
         VALUES (:name, :email, :role, :message, :rating, 'pending')"
    );
    $stmt->execute([
        'name'    => $name,
        'email'   => $email ?: null,
        'role'    => $role  ?: null,
        'message' => $message,
        'rating'  => $rating,
    ]);

    http_response_code(201);
    echo json_encode(["status" => "success", "message" => "Thank you! Your review has been submitted and is awaiting approval."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
