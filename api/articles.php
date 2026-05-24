<?php
/**
 * Articles CRUD endpoint
 *
 * GET    /api/articles.php         – List active articles (public)
 * POST   /api/articles.php         – Create article (auth required)
 * PUT    /api/articles.php?id=X    – Update article (auth required)
 * DELETE /api/articles.php?id=X    – Delete article (auth required)
 *
 * @license CC BY-NC-SA 4.0
 */
require_once 'config.php';
require_once 'helpers.php';

cors();

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

// ── LIST (public) ────────────────────────────────────────────
if ($method === 'GET') {
    $admin = getAuthUser();
    $where = $admin ? '1=1' : 'active = 1';
    $stmt  = $db->query(
        "SELECT * FROM articles WHERE {$where} ORDER BY sort_order ASC, id ASC"
    );
    jsonResponse($stmt->fetchAll());
}

// ── CREATE ───────────────────────────────────────────────────
if ($method === 'POST') {
    $user = requireAuth();
    $data = getBody();

    $stmt = $db->prepare(
        'INSERT INTO articles
             (medium_url, title, author_name, description, thumbnail_url, sort_order, author_id)
         VALUES (?,?,?,?,?,?,?)'
    );
    $stmt->execute([
        trim($data['medium_url']    ?? ''),
        trim($data['title']         ?? ''),
        trim($data['author_name']   ?? ''),
        trim($data['description']   ?? ''),
        trim($data['thumbnail_url'] ?? ''),
        (int) ($data['sort_order']  ?? 0),
        $user['id'],
    ]);

    $id  = $db->lastInsertId();
    $row = $db->prepare('SELECT * FROM articles WHERE id = ?');
    $row->execute([$id]);
    jsonResponse($row->fetch(), 201);
}

// ── UPDATE ───────────────────────────────────────────────────
if ($method === 'PUT') {
    requireAuth();
    $id   = (int) ($_GET['id'] ?? 0);
    if (!$id) errorResponse('id parameter required');
    $data = getBody();

    $stmt = $db->prepare(
        'UPDATE articles SET
             medium_url=?, title=?, author_name=?, description=?,
             thumbnail_url=?, sort_order=?, active=?
         WHERE id=?'
    );
    $stmt->execute([
        trim($data['medium_url']    ?? ''),
        trim($data['title']         ?? ''),
        trim($data['author_name']   ?? ''),
        trim($data['description']   ?? ''),
        trim($data['thumbnail_url'] ?? ''),
        (int) ($data['sort_order']  ?? 0),
        (int) ($data['active']      ?? 1),
        $id,
    ]);

    $row = $db->prepare('SELECT * FROM articles WHERE id = ?');
    $row->execute([$id]);
    jsonResponse($row->fetch());
}

// ── DELETE ───────────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) errorResponse('id parameter required');
    $db->prepare('DELETE FROM articles WHERE id = ?')->execute([$id]);
    jsonResponse(['message' => 'Deleted']);
}

// ── REORDER ──────────────────────────────────────────────────
if ($method === 'PATCH') {
    requireAuth();
    $order = getBody(); // [{id, sort_order}, ...]
    $stmt  = $db->prepare('UPDATE articles SET sort_order = ? WHERE id = ?');
    foreach ($order as $item) {
        $stmt->execute([(int)($item['sort_order'] ?? 0), (int)($item['id'] ?? 0)]);
    }
    jsonResponse(['message' => 'Order saved']);
}

errorResponse('Method not allowed', 405);
