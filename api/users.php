<?php
/**
 * User profile endpoint (auth required)
 *
 * GET /api/users.php  – Returns current user's profile
 * PUT /api/users.php  – Updates profile (email, stubs, optional password change)
 *
 * @license CC BY-NC-SA 4.0
 */
require_once 'config.php';
require_once 'helpers.php';

cors();

$user   = requireAuth();
$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── GET PROFILE ──────────────────────────────────────────────
if ($method === 'GET') {
    $stmt = $db->prepare(
        'SELECT id, username, email, github_url_stub, buymeacoffee_url, college_email
         FROM users WHERE id = ?'
    );
    $stmt->execute([$user['id']]);
    jsonResponse($stmt->fetch());
}

// ── UPDATE PROFILE ───────────────────────────────────────────
if ($method === 'PUT') {
    $data = getBody();

    // Optional password change – requires current password verification
    if (!empty($data['new_password'])) {
        if (empty($data['current_password'])) {
            errorResponse('current_password is required to set a new password');
        }
        if (!password_verify($data['current_password'], $user['password_hash'])) {
            errorResponse('Current password is incorrect', 401);
        }
        $hash = password_hash($data['new_password'], PASSWORD_DEFAULT);
        $db->prepare('UPDATE users SET password_hash = ? WHERE id = ?')
           ->execute([$hash, $user['id']]);
    }

    $stmt = $db->prepare(
        'UPDATE users SET email=?, github_url_stub=?, buymeacoffee_url=?, college_email=?
         WHERE id=?'
    );
    $stmt->execute([
        trim($data['email']            ?? $user['email']),
        trim($data['github_url_stub']  ?? $user['github_url_stub']),
        trim($data['buymeacoffee_url'] ?? $user['buymeacoffee_url']),
        trim($data['college_email']    ?? $user['college_email']),
        $user['id'],
    ]);

    $stmt2 = $db->prepare(
        'SELECT id, username, email, github_url_stub, buymeacoffee_url, college_email
         FROM users WHERE id = ?'
    );
    $stmt2->execute([$user['id']]);
    jsonResponse($stmt2->fetch());
}

errorResponse('Method not allowed', 405);
