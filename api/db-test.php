<?php
/**
 * Temporary DB connection diagnostic — DELETE AFTER USE.
 */
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: text/plain; charset=UTF-8');
echo "Script started\n";

$cfgFile = __DIR__ . '/.config.json';

if (!file_exists($cfgFile)) {
    echo "FAIL: .config.json not found at {$cfgFile}\n";
    exit;
}

$cfg = json_decode(file_get_contents($cfgFile), true);
if (!is_array($cfg)) {
    echo "FAIL: .config.json is invalid JSON\n";
    exit;
}

$host    = $cfg['db_host']    ?? 'localhost';
$port    = (int) ($cfg['db_port'] ?? 3306);
$dbname  = $cfg['db_name']    ?? '';
$user    = $cfg['db_user']    ?? '';
$pass    = $cfg['db_pass']    ?? '';
$charset = $cfg['db_charset'] ?? 'utf8mb4';

echo "Config loaded OK\n";
echo "  host:    {$host}\n";
echo "  port:    {$port}\n";
echo "  dbname:  {$dbname}\n";
echo "  user:    {$user}\n";
echo "  charset: {$charset}\n\n";

$dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset={$charset}";

try {
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    echo "SUCCESS: Connected to MySQL\n";
    $ver = $pdo->query('SELECT VERSION()')->fetchColumn();
    echo "  MySQL version: {$ver}\n\n";

    // Check expected tables exist
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables in {$dbname}:\n";
    if ($tables) {
        foreach ($tables as $t) echo "  - {$t}\n";
    } else {
        echo "  (none — database is empty, schema has not been imported)\n";
    }
} catch (PDOException $e) {
    echo "FAIL: " . $e->getMessage() . "\n";
}
