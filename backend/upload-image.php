<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Cache-Control, Pragma");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed."]);
    exit;
}

require_once __DIR__ . '/config.php';

// ── Authenticate admin ────────────────────────────────────────────────────────
$adminUsername = isset($_POST['admin_username']) ? trim($_POST['admin_username']) : '';
$adminPassword = isset($_POST['admin_password']) ? $_POST['admin_password'] : '';

if (empty($adminUsername) || empty($adminPassword)) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Admin credentials required."]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT password FROM users WHERE username = :username LIMIT 1");
    $stmt->execute(['username' => $adminUsername]);
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

// ── Validate uploaded file ────────────────────────────────────────────────────
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    $uploadErrors = [
        UPLOAD_ERR_INI_SIZE   => "File exceeds server limit.",
        UPLOAD_ERR_FORM_SIZE  => "File exceeds form limit.",
        UPLOAD_ERR_PARTIAL    => "File only partially uploaded.",
        UPLOAD_ERR_NO_FILE    => "No file uploaded.",
        UPLOAD_ERR_NO_TMP_DIR => "Missing temp folder.",
        UPLOAD_ERR_CANT_WRITE => "Failed to write file.",
        UPLOAD_ERR_EXTENSION  => "Upload blocked by extension.",
    ];
    $errCode = isset($_FILES['image']['error']) ? $_FILES['image']['error'] : UPLOAD_ERR_NO_FILE;
    $errMsg  = isset($uploadErrors[$errCode]) ? $uploadErrors[$errCode] : "Unknown upload error.";
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => $errMsg]);
    exit;
}

$file     = $_FILES['image'];
$mimeType = mime_content_type($file['tmp_name']);
$allowed  = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

if (!in_array($mimeType, $allowed)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Only JPG, PNG and WebP images are allowed."]);
    exit;
}

if ($file['size'] > 5 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Image must be under 5 MB."]);
    exit;
}

// ── Resolve upload directory ──────────────────────────────────────────────────
// Works for both local dev (public/ sibling of backend/) and
// Hostinger live (backend/ and image folders are all inside public_html/)
$folder = isset($_POST['folder']) ? preg_replace('/[^a-z0-9_-]/', '', strtolower($_POST['folder'])) : 'packages';

// Try sibling public/ first (local dev structure)
$siblingPublic = __DIR__ . '/../public/' . $folder . '/';
// Fallback: same directory level as backend/ (Hostinger live structure)
$sameLevel = __DIR__ . '/../' . $folder . '/';

if (is_dir(__DIR__ . '/../public/')) {
    $uploadDir = $siblingPublic;
} else {
    $uploadDir = $sameLevel;
}

// Create the directory if it doesn't exist
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Could not create upload directory."]);
        exit;
    }
}

// ── Generate unique filename ──────────────────────────────────────────────────
$ext = 'jpg';
if ($mimeType === 'image/png')  $ext = 'png';
if ($mimeType === 'image/webp') $ext = 'webp';

$filename = uniqid('img_', true) . '.' . $ext;
$destPath = $uploadDir . $filename;

if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Failed to save image. Check directory permissions."]);
    exit;
}

// ── Return the public URL path ────────────────────────────────────────────────
$publicPath = '/' . $folder . '/' . $filename;
echo json_encode(["status" => "success", "path" => $publicPath]);
