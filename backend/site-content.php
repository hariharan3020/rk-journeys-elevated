<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$contentFile = __DIR__ . '/site-content.json';

// ── GET: Return current content (public) ──────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($contentFile)) {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Content file not found."]);
        exit;
    }
    $content = file_get_contents($contentFile);
    if ($content === false) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to read content file."]);
        exit;
    }
    // Return raw JSON (already valid)
    echo $content;
    exit;
}

// ── POST: Update content (admin-authenticated) ────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once __DIR__ . '/config.php';

    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON payload."]);
        exit;
    }

    // Require admin password verification
    $adminPassword = isset($data['admin_password']) ? $data['admin_password'] : '';
    if (empty($adminPassword)) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Admin password required."]);
        exit;
    }

    // Verify password against DB
    try {
        $stmt = $pdo->prepare("SELECT password FROM users WHERE username = :username LIMIT 1");
        $stmt->execute(['username' => isset($data['admin_username']) ? $data['admin_username'] : 'admin']);
        $user = $stmt->fetch();
        if (!$user || !password_verify($adminPassword, $user['password'])) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Invalid admin credentials."]);
            exit;
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
        exit;
    }

    // Remove auth fields from content payload
    unset($data['admin_password'], $data['admin_username']);

    // Read existing content and merge
    $existing = [];
    if (file_exists($contentFile)) {
        $existing = json_decode(file_get_contents($contentFile), true) ?? [];
    }

    // Merge at top level (each section key)
    foreach ($data as $key => $value) {
        $existing[$key] = $value;
    }

    // Write back
    $result = file_put_contents(
        $contentFile,
        json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        LOCK_EX
    );

    if ($result === false) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to write content file. Check file permissions."]);
        exit;
    }

    echo json_encode(["status" => "success", "message" => "Content updated successfully."]);
    exit;
}

http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed."]);
?>
