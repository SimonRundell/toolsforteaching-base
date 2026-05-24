<?php
/**
 * Image upload endpoint (auth required)
 *
 * POST /api/upload.php  – multipart/form-data, field name: "image"
 * Returns: { path: "/images/img_xxxx.jpg" }
 *
 * @license CC BY-NC-SA 4.0
 */
require_once 'config.php';
require_once 'helpers.php';

cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method not allowed', 405);
}

requireAuth();

if (empty($_FILES['image'])) {
    errorResponse('No file uploaded (field name must be "image")');
}

$file         = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

if (!in_array($file['type'], $allowedTypes, true)) {
    errorResponse('Invalid file type. Allowed: JPG, PNG, WebP, GIF, SVG');
}

if ($file['size'] > 5 * 1024 * 1024) {
    errorResponse('File too large. Maximum 5 MB');
}

if ($file['error'] !== UPLOAD_ERR_OK) {
    errorResponse('Upload error code: ' . $file['error'], 500);
}

if (!is_dir(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0755, true);
}

$ext      = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$filename = uniqid('img_', true) . '.' . $ext;
$dest     = UPLOAD_DIR . $filename;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    errorResponse('Failed to move uploaded file', 500);
}

jsonResponse(['path' => UPLOAD_URL_PREFIX . $filename]);
