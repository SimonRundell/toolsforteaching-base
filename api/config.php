<?php
/**
 * Database configuration for Tools for Teaching API.
 *
 * Reads all settings from api/.config.json (gitignored).
 * Copy api/.example.config.json → api/.config.json and fill in your credentials.
 *
 * @license CC BY-NC-SA 4.0
 */

$_cfgFile = __DIR__ . '/.config.json';

if (!file_exists($_cfgFile)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'API configuration file missing. Copy api/.example.config.json to api/.config.json and fill in your credentials.']);
    exit;
}

$_cfg = json_decode(file_get_contents($_cfgFile), true);

if (!is_array($_cfg)) {
    http_response_code(500);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['error' => 'api/.config.json contains invalid JSON.']);
    exit;
}

define('DB_HOST',    $_cfg['db_host']    ?? 'localhost');
define('DB_NAME',    $_cfg['db_name']    ?? 'tft_db');
define('DB_USER',    $_cfg['db_user']    ?? '');
define('DB_PASS',    $_cfg['db_pass']    ?? '');
define('DB_CHARSET', $_cfg['db_charset'] ?? 'utf8mb4');

/**
 * Absolute filesystem path for uploaded images.
 * Override via "upload_dir" in .config.json for live deployments where
 * the Vite build flattens public/ into the web root (no public/ subdirectory).
 */
define('UPLOAD_DIR', $_cfg['upload_dir'] ?? dirname(__DIR__) . DIRECTORY_SEPARATOR . 'public' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR);

/**
 * URL prefix returned to the client for uploaded images.
 * Override via "upload_url_prefix" in .config.json if the app lives in a subdirectory.
 */
define('UPLOAD_URL_PREFIX', $_cfg['upload_url_prefix'] ?? '/images/');

/** Auth token lifetime in hours */
define('TOKEN_EXPIRY_HOURS', (int) ($_cfg['token_expiry_hours'] ?? 24));

unset($_cfgFile, $_cfg);

/**
 * Returns a singleton PDO connection.
 *
 * @return PDO
 * @throws PDOException on connection failure
 */
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            DB_HOST, DB_NAME, DB_CHARSET
        );
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }
    return $pdo;
}
