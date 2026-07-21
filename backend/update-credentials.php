<?php
/**
 * PUT  — update the logged-in admin's username and/or password
 *
 * Body (JSON):
 *   {
 *     "username":         "current username",   // used to look up the record
 *     "current_password": "...",
 *     "new_username":     "...",   // optional
 *     "new_password":     "..."    // optional
 *   }
 *
 * Rules:
 *   - username + current_password are always required
 *   - new_username and/or new_password must be present (at least one)
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Only PUT requests are allowed."]);
    exit;
}

require_once __DIR__ . '/config.php';

$data = json_decode(file_get_contents("php://input"), true) ?? [];

$username        = isset($data['username'])         ? trim($data['username'])         : '';
$currentPassword = isset($data['current_password']) ? trim($data['current_password']) : '';
$newUsername     = isset($data['new_username'])      ? trim($data['new_username'])     : '';
$newPassword     = isset($data['new_password'])      ? trim($data['new_password'])     : '';

// Basic validation
if (empty($username)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Username is required."]);
    exit;
}
if (empty($currentPassword)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Current password is required to make changes."]);
    exit;
}
if (empty($newUsername) && empty($newPassword)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Provide a new username or a new password."]);
    exit;
}

try {
    // Fetch user by username
    $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "User not found."]);
        exit;
    }

    // Verify current password
    if (!password_verify($currentPassword, $user['password'])) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Current password is incorrect."]);
        exit;
    }

    // Build update fields
    $fields = [];
    $params = ['id' => $user['id']];

    if (!empty($newUsername)) {
        if (strlen($newUsername) < 3 || strlen($newUsername) > 50) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Username must be 3–50 characters."]);
            exit;
        }
        // Check uniqueness (ignore own record)
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE username = :username AND id != :id");
        $checkStmt->execute(['username' => $newUsername, 'id' => $user['id']]);
        if ($checkStmt->fetch()) {
            http_response_code(409);
            echo json_encode(["status" => "error", "message" => "That username is already taken."]);
            exit;
        }
        $fields[]           = 'username = :username';
        $params['username'] = $newUsername;
    }

    if (!empty($newPassword)) {
        if (strlen($newPassword) < 6) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "New password must be at least 6 characters."]);
            exit;
        }
        $fields[]           = 'password = :password';
        $params['password'] = password_hash($newPassword, PASSWORD_DEFAULT);
    }

    $sql  = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Return the (possibly updated) username so the frontend can refresh localStorage
    $returnUsername = !empty($newUsername) ? $newUsername : $user['username'];

    echo json_encode([
        "status"   => "success",
        "message"  => "Credentials updated successfully.",
        "username" => $returnUsername,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
