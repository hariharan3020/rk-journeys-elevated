<?php
/**
 * Admin Reviews API
 *
 * GET    ?status=all|pending|approved|rejected   — list reviews
 * PUT                                             — update review (edit text/rating or change status)
 * DELETE ?id=<n>                                  — delete a review
 *
 * Public read (approved only): GET ?public=1
 */
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';

// Auto-create table if missing (failsafe)
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

$method = $_SERVER['REQUEST_METHOD'];

// ── GET ───────────────────────────────────────────────────────────────────────
if ($method === 'GET') {
    // Public-facing: only approved reviews
    if (!empty($_GET['public'])) {
        $stmt = $pdo->query(
            "SELECT id, name, role, message, rating, created_at
               FROM customer_reviews
              WHERE status = 'approved'
           ORDER BY created_at DESC"
        );
        echo json_encode(["status" => "success", "reviews" => $stmt->fetchAll()]);
        exit;
    }

    // Admin: filter by status
    $filter = $_GET['status'] ?? 'all';
    $allowed = ['all', 'pending', 'approved', 'rejected'];
    if (!in_array($filter, $allowed)) {
        $filter = 'all';
    }

    if ($filter === 'all') {
        $stmt = $pdo->query(
            "SELECT * FROM customer_reviews ORDER BY created_at DESC"
        );
    } else {
        $stmt = $pdo->prepare(
            "SELECT * FROM customer_reviews WHERE status = :status ORDER BY created_at DESC"
        );
        $stmt->execute(['status' => $filter]);
    }

    $reviews = $stmt->fetchAll();

    // Counts per status for the admin badges
    $counts = $pdo->query(
        "SELECT status, COUNT(*) as count FROM customer_reviews GROUP BY status"
    )->fetchAll();

    $countMap = ['pending' => 0, 'approved' => 0, 'rejected' => 0, 'all' => count($reviews)];
    foreach ($counts as $c) {
        $countMap[$c['status']] = (int)$c['count'];
    }
    $countMap['all'] = array_sum([$countMap['pending'], $countMap['approved'], $countMap['rejected']]);

    echo json_encode(["status" => "success", "reviews" => $reviews, "counts" => $countMap]);
    exit;
}

// ── PUT — edit or change status ───────────────────────────────────────────────
if ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true) ?? [];

    $id = isset($data['id']) ? (int)$data['id'] : 0;
    if (!$id) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Review ID is required."]);
        exit;
    }

    // Build update fields dynamically
    $fields = [];
    $params = ['id' => $id];

    if (isset($data['status'])) {
        $allowed = ['pending', 'approved', 'rejected'];
        if (!in_array($data['status'], $allowed)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid status value."]);
            exit;
        }
        $fields[]         = 'status = :status';
        $params['status'] = $data['status'];
    }
    if (isset($data['name'])) {
        $name = trim($data['name']);
        if (empty($name) || strlen($name) > 100) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Name must be 1–100 characters."]);
            exit;
        }
        $fields[]       = 'name = :name';
        $params['name'] = $name;
    }
    if (isset($data['role'])) {
        $fields[]       = 'role = :role';
        $params['role'] = trim($data['role']) ?: null;
    }
    if (isset($data['message'])) {
        $msg = trim($data['message']);
        if (strlen($msg) < 10) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Message must be at least 10 characters."]);
            exit;
        }
        $fields[]          = 'message = :message';
        $params['message'] = $msg;
    }
    if (isset($data['rating'])) {
        $r = (int)$data['rating'];
        if ($r < 1 || $r > 5) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Rating must be between 1 and 5."]);
            exit;
        }
        $fields[]          = 'rating = :rating';
        $params['rating']  = $r;
    }

    if (empty($fields)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "No fields to update."]);
        exit;
    }

    try {
        $sql  = "UPDATE customer_reviews SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Review not found."]);
            exit;
        }

        echo json_encode(["status" => "success", "message" => "Review updated."]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

// ── DELETE ────────────────────────────────────────────────────────────────────
if ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true) ?? [];
    $id   = isset($_GET['id'])   ? (int)$_GET['id']   :
           (isset($data['id'])   ? (int)$data['id']   : 0);

    if (!$id) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Review ID is required."]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM customer_reviews WHERE id = :id");
        $stmt->execute(['id' => $id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Review not found."]);
            exit;
        }

        echo json_encode(["status" => "success", "message" => "Review deleted."]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
    }
    exit;
}

http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed."]);
?>
