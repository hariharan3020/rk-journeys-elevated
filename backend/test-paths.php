<?php
// ── Temporary debug endpoint — DELETE after testing ───────────────────────────
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$docRoot = rtrim($_SERVER['DOCUMENT_ROOT'], '/\\');

echo json_encode([
    "DOCUMENT_ROOT"   => $docRoot,
    "__DIR__"         => __DIR__,
    "packages_path"   => $docRoot . DIRECTORY_SEPARATOR . "packages",
    "packages_exists" => is_dir($docRoot . DIRECTORY_SEPARATOR . "packages"),
    "backend_dir"     => __DIR__,
    "parent_dir"      => dirname(__DIR__),
    "sibling_public"  => is_dir(__DIR__ . '/../public/') ? "EXISTS" : "NOT FOUND",
    "PHP_version"     => PHP_VERSION,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
