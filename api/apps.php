<?php
/**
 * Apps CRUD endpoint
 *
 * GET    /api/apps.php         – List active apps (public)
 * POST   /api/apps.php         – Create app (auth required)
 * PUT    /api/apps.php?id=X    – Update app (auth required)
 * DELETE /api/apps.php?id=X    – Delete app (auth required)
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
    // Admin can see all (including inactive); public sees active only
    $where = $admin ? '1=1' : 'a.active = 1';
    $stmt  = $db->query(
        "SELECT a.*, u.buymeacoffee_url AS author_bmc, u.github_url_stub AS author_github_stub
         FROM apps a
         LEFT JOIN users u ON u.id = a.author_id
         WHERE {$where}
         ORDER BY a.sort_order ASC, a.id ASC"
    );
    jsonResponse($stmt->fetchAll());
}

// ── CREATE ───────────────────────────────────────────────────
if ($method === 'POST') {
    $user = requireAuth();
    $data = getBody();

    $stmt = $db->prepare(
        'INSERT INTO apps
             (app_key, title, description, image_path, image_alt,
              badge, badge_class, badge_bg, badge_fg, launch_url, github_url,
              more_info_title, more_info_body, sort_order, author_id)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    );
    $stmt->execute([
        trim($data['app_key']        ?? ''),
        trim($data['title']          ?? ''),
        trim($data['description']    ?? ''),
        trim($data['image_path']     ?? ''),
        trim($data['image_alt']      ?? ''),
        trim($data['badge']          ?? ''),
        trim($data['badge_class']    ?? ''),
        trim($data['badge_bg']       ?? ''),
        trim($data['badge_fg']       ?? ''),
        trim($data['launch_url']     ?? ''),
        trim($data['github_url']     ?? ''),
        trim($data['more_info_title']?? ''),
        $data['more_info_body']      ?? '',
        (int) ($data['sort_order']   ?? 0),
        $user['id'],
    ]);

    $id   = $db->lastInsertId();
    $row  = $db->prepare('SELECT * FROM apps WHERE id = ?');
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
        'UPDATE apps SET
             app_key=?, title=?, description=?, image_path=?, image_alt=?,
             badge=?, badge_class=?, badge_bg=?, badge_fg=?, launch_url=?, github_url=?,
             more_info_title=?, more_info_body=?, sort_order=?, active=?
         WHERE id=?'
    );
    $stmt->execute([
        trim($data['app_key']        ?? ''),
        trim($data['title']          ?? ''),
        trim($data['description']    ?? ''),
        trim($data['image_path']     ?? ''),
        trim($data['image_alt']      ?? ''),
        trim($data['badge']          ?? ''),
        trim($data['badge_class']    ?? ''),
        trim($data['badge_bg']       ?? ''),
        trim($data['badge_fg']       ?? ''),
        trim($data['launch_url']     ?? ''),
        trim($data['github_url']     ?? ''),
        trim($data['more_info_title']?? ''),
        $data['more_info_body']      ?? '',
        (int) ($data['sort_order']   ?? 0),
        (int) ($data['active']       ?? 1),
        $id,
    ]);

    $row = $db->prepare('SELECT * FROM apps WHERE id = ?');
    $row->execute([$id]);
    jsonResponse($row->fetch());
}

// ── DELETE ───────────────────────────────────────────────────
if ($method === 'DELETE') {
    requireAuth();
    $id = (int) ($_GET['id'] ?? 0);
    if (!$id) errorResponse('id parameter required');
    $db->prepare('DELETE FROM apps WHERE id = ?')->execute([$id]);
    jsonResponse(['message' => 'Deleted']);
}

// ── REORDER ──────────────────────────────────────────────────
if ($method === 'PATCH') {
    requireAuth();
    $order = getBody(); // [{id, sort_order}, ...]
    $stmt  = $db->prepare('UPDATE apps SET sort_order = ? WHERE id = ?');
    foreach ($order as $item) {
        $stmt->execute([(int)($item['sort_order'] ?? 0), (int)($item['id'] ?? 0)]);
    }
    jsonResponse(['message' => 'Order saved']);
}

errorResponse('Method not allowed', 405);
