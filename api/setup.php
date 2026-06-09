<?php
/**
 * One-time setup script – creates the initial admin user.
 *
 * Access via browser ONCE: http://localhost/api/setup.php
 * DELETE THIS FILE after running it.
 *
 * @license CC BY-NC-SA 4.0
 */
require_once 'config.php';

header('Content-Type: text/html; charset=UTF-8');

// Only allow running if no users exist yet
$db = getDB();
$count = $db->query('SELECT COUNT(*) FROM users')->fetchColumn();

if ((int)$count > 0) {
    echo '<h2>Setup already complete.</h2><p>Users exist in the database. Delete this file.</p>';
    exit;
}

$defaultUsername = 'simon';
$defaultPassword = 'Admin@TfT2024';   // CHANGE THIS after first login
$defaultEmail    = 'simon@rundell.org.uk';

$hash = password_hash($defaultPassword, PASSWORD_DEFAULT);

$db->prepare(
    'INSERT INTO users (username, email, password_hash, github_url_stub, buymeacoffee_url, college_email)
     VALUES (?, ?, ?, ?, ?, ?)'
)->execute([
    $defaultUsername,
    $defaultEmail,
    $hash,
    'SimonRundell',
    'https://buymeacoffee.com/simonrundell',
    '',
]);

echo '<h2>Setup complete!</h2>';
echo '<p>Admin user created:</p>';
echo '<ul>';
echo "<li>Username: <strong>{$defaultUsername}</strong></li>";
echo "<li>Password: <strong>{$defaultPassword}</strong></li>";
echo '</ul>';
echo '<p><strong>Change your password after first login. Then delete this file.</strong></p>';
echo '<p><a href="/">Go to site</a></p>';
