<?php
/**
 * Shared helper functions for the Tools for Teaching API
 * @license CC BY-NC-SA 4.0
 */

/**
 * Sends CORS headers and handles OPTIONS preflight.
 * Call at the top of every endpoint file.
 */
function cors(): void {
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

/**
 * Sends a JSON response and exits.
 *
 * @param mixed $data
 * @param int   $code HTTP status code
 */
function jsonResponse(mixed $data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Sends an error JSON response and exits.
 *
 * @param string $message
 * @param int    $code HTTP status code
 */
function errorResponse(string $message, int $code = 400): void {
    jsonResponse(['error' => $message], $code);
}

/**
 * Returns the authenticated user record if the Bearer token is valid, or null.
 *
 * @return array|null
 */
function getAuthUser(): ?array {
    $header = $_SERVER['HTTP_AUTHORIZATION']
           ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION']
           ?? '';
    if (!str_starts_with($header, 'Bearer ')) {
        return null;
    }
    $token = substr($header, 7);
    $db    = getDB();
    $stmt  = $db->prepare(
        'SELECT u.* FROM users u
         JOIN auth_tokens t ON t.user_id = u.id
         WHERE t.token = ? AND t.expires_at > NOW()'
    );
    $stmt->execute([$token]);
    return $stmt->fetch() ?: null;
}

/**
 * Requires a valid auth token; exits with 401 if missing or expired.
 *
 * @return array Authenticated user record
 */
function requireAuth(): array {
    $user = getAuthUser();
    if (!$user) {
        errorResponse('Unauthorized', 401);
    }
    return $user;
}

/**
 * Parses and returns the JSON request body as an associative array.
 *
 * @return array
 */
function getBody(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}
