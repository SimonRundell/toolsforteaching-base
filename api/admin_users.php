<?php
/**
 * Admin user management endpoint (auth required)
 *
 * GET    /api/admin_users.php        – List all admin users
 * POST   /api/admin_users.php        – Create a new admin user
 * DELETE /api/admin_users.php?id=X   – Delete a user (cannot delete self)
 *
 * @license CC BY-NC-SA 4.0
 */
require_once 'config.php';
require_once 'helpers.php';

cors();

$auth   = requireAuth();
$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── LIST USERS ───────────────────────────────────────────────
if ($method === 'GET') {
    $stmt = $db->query(
        'SELECT id, username, email, github_url_stub, buymeacoffee_url, college_email, created_at
         FROM users ORDER BY id'
    );
    jsonResponse($stmt->fetchAll());
}

// ── CREATE USER ──────────────────────────────────────────────
if ($method === 'POST') {
    $data     = getBody();
    $username = trim($data['username'] ?? '');
    $email    = trim($data['email']    ?? '');
    $password = $data['password']      ?? '';

    if (!$username || !$email || !$password) {
        errorResponse('Username, email and password are required');
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        errorResponse('Invalid email address');
    }
    if (strlen($password) < 8) {
        errorResponse('Password must be at least 8 characters');
    }

    $check = $db->prepare('SELECT id FROM users WHERE username = ?');
    $check->execute([$username]);
    if ($check->fetch()) {
        errorResponse('Username already taken', 409);
    }

    $stmt = $db->prepare(
        'INSERT INTO users (username, email, password_hash, github_url_stub, buymeacoffee_url, college_email)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $username,
        $email,
        password_hash($password, PASSWORD_DEFAULT),
        trim($data['github_url_stub']  ?? ''),
        trim($data['buymeacoffee_url'] ?? ''),
        trim($data['college_email']    ?? ''),
    ]);

    $newId = (int) $db->lastInsertId();
    $row   = $db->prepare(
        'SELECT id, username, email, github_url_stub, buymeacoffee_url, college_email, created_at
         FROM users WHERE id = ?'
    );
    $row->execute([$newId]);
    jsonResponse($row->fetch(), 201);
}

// ── DELETE USER ──────────────────────────────────────────────
if ($method === 'DELETE') {
    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) {
        errorResponse('id is required');
    }
    if ($id === (int) $auth['id']) {
        errorResponse('You cannot delete your own account', 403);
    }
    $db->prepare('DELETE FROM users WHERE id = ?')->execute([$id]);
    jsonResponse(['message' => 'User deleted']);
}

errorResponse('Method not allowed', 405);
