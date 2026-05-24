<?php
/**
 * Contact form endpoint – proxies to Web3Forms
 *
 * POST /api/contact.php
 * Body: { name, email, subject, message, access_key? }
 *
 * @license CC BY-NC-SA 4.0
 */
require_once 'config.php';
require_once 'helpers.php';

cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    errorResponse('Method not allowed', 405);
}

$data    = getBody();
$name    = strip_tags(trim($data['name']    ?? ''));
$email   = filter_var(trim($data['email']  ?? ''), FILTER_VALIDATE_EMAIL);
$subject = strip_tags(trim($data['subject'] ?? ''));
$message = strip_tags(trim($data['message'] ?? ''));

if (!$name || !$email || !$subject || !$message) {
    errorResponse('All fields are required');
}

// Forward to Web3Forms
$accessKey = $data['access_key'] ?? 'b38ede3c-00d4-4d56-b1cf-efddf91f947f';

$payload = json_encode([
    'access_key' => $accessKey,
    'name'       => $name,
    'email'      => $email,
    'subject'    => $subject,
    'message'    => $message,
]);

$ch = curl_init('https://api.web3forms.com/submit');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$result = json_decode($response, true);

if ($httpCode === 200 && !empty($result['success'])) {
    jsonResponse(['message' => 'Message sent successfully']);
} else {
    errorResponse($result['message'] ?? 'Submission failed. Please try again.', 500);
}
