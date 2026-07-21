<?php
// Set response headers to JSON
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma");

// Handle CORS preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include database configuration
require_once __DIR__ . '/config.php';

// Get request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "error", "message" => "Only POST requests are allowed."]);
    exit;
}

// Get POST data (supporting both JSON payload and standard form data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST;
}

$username = isset($data['username']) ? trim($data['username']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

// Validation
if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Username and password are required."]);
    exit;
}

try {
    // Auto-seed default admin if database is empty
    $countStmt = $pdo->query("SELECT COUNT(*) FROM users");
    $count = $countStmt->fetchColumn();
    if ($count == 0) {
        $defaultUser = 'admin';
        $defaultPass = password_hash('admin123', PASSWORD_DEFAULT);
        $insertStmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
        $insertStmt->execute(['username' => $defaultUser, 'password' => $defaultPass]);
    }

    // Fetch user from the database
    $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();

    // Verify user exists and password is correct
    if ($user && password_verify($password, $user['password'])) {
        // Login success
        // In a real application, you would generate a JWT token or start a session here.
        http_response_code(200); // OK
        echo json_encode([
            "status" => "success",
            "message" => "Login successful.",
            "user" => [
                "id" => $user['id'],
                "username" => $user['username']
            ]
        ]);
    } else {
        // Login failure
        http_response_code(401); // Unauthorized
        echo json_encode(["status" => "error", "message" => "Invalid username or password."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
