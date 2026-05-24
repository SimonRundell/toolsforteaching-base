<?php
/**
 * Authentication endpoint
 *
 * POST   /api/auth.php  – Login; returns {token, expires_at, user}
 * GET    /api/auth.php  – Verify current token; returns {user}
 * DELETE /api/auth.php  – Logout (revoke token)
 *
 * @license CC BY-NC-SA 4.0
 */
require_once 'config.php';
require_once 'helpers.php';

cors();

$method = $_SERVER['REQUEST_METHOD'];

// ── LOGIN ────────────────────────────────────────────────────
if ($method === 'POST') {
    $body     = getBody();
    $username = trim($body['username'] ?? '');
    $password = $body['password'] ?? '';

    if (!$username || !$password) {
        errorResponse('Username and password are required');
    }

    $db   = getDB();
    $stmt = $db->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        errorResponse('Invalid credentials', 401);
    }

    // Prune expired tokens and existing tokens for this user
    $db->prepare('DELETE FROM auth_tokens WHERE user_id = ? OR expires_at < NOW()')->execute([$user['id']]);

    $token   = bin2hex(random_bytes(32));
    $expiry  = date('Y-m-d H:i:s', time() + TOKEN_EXPIRY_HOURS * 3600);

    $db->prepare('INSERT INTO auth_tokens (user_id, token, expires_at) VALUES (?, ?, ?)')
       ->execute([$user['id'], $token, $expiry]);

    jsonResponse([
        'token'      => $token,
        'expires_at' => $expiry,
        'user'       => [
            'id'               => (int) $user['id'],
            'username'         => $user['username'],
            'email'            => $user['email'],
            'github_url_stub'  => $user['github_url_stub'],
            'buymeacoffee_url' => $user['buymeacoffee_url'],
            'college_email'    => $user['college_email'],
        ],
    ]);
}

// ── VERIFY ───────────────────────────────────────────────────
if ($method === 'GET') {
    $user = requireAuth();
    jsonResponse([
        'user' => [
            'id'               => (int) $user['id'],
            'username'         => $user['username'],
            'email'            => $user['email'],
            'github_url_stub'  => $user['github_url_stub'],
            'buymeacoffee_url' => $user['buymeacoffee_url'],
            'college_email'    => $user['college_email'],
        ],
    ]);
}

// ── LOGOUT ───────────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    $token  = substr($header, 7);
    getDB()->prepare('DELETE FROM auth_tokens WHERE token = ?')->execute([$token]);
    jsonResponse(['message' => 'Logged out']);
}

errorResponse('Method not allowed', 405);
