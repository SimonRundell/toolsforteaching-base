# Tools for Teaching

A React + PHP + MySQL web application for showcasing and managing teaching tools and articles. Built for Further Education teachers to maintain a public-facing catalogue of tools, with a full-featured admin panel.

**Version:** 0.0.2  
**License:** [CC BY-NC-SA 4.0](LICENSE)  
**Author:** Simon Rundell, ITDD Department, Exeter and North Devon Colleges Group

---

## Features

- **Public site** — hero section, articles grid (Medium / external links), tools grid with launch links, GitHub links, and rich "More Info" modal
- **Admin panel** — CRUD for tools and articles, drag-and-drop reordering, badge colour customisation, admin user management, profile / password settings
- **Badge system** — 11 preset colour swatches or custom hex colour pickers per tool
- **Rich text editor** — Tiptap (ProseMirror) WYSIWYG for tool "More Info" bodies
- **Image upload** — server-side upload to `public/images/` with live preview in the form
- **Token auth** — Bearer token stored in `localStorage`; Apache-compatible passthrough

---

## Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | React 19 · Vite 8 · React Router 7 · Tiptap 3      |
| HTTP       | Axios with auth-token request interceptor           |
| Backend    | PHP 8.3 · PDO · no framework                        |
| Database   | MySQL 8 / MariaDB 10.6+ · utf8mb4                   |
| Dev server | Laragon (Apache + PHP-FPM on `http://localhost`)    |

---

## Prerequisites

- **Node.js** 18 or later
- **PHP** 8.1 or later (8.3 recommended)
- **MySQL** 8 or **MariaDB** 10.6+
- **Apache** with `mod_rewrite` enabled (Laragon, XAMPP, or similar)
- A free [Web3Forms](https://web3forms.com) account for the contact form

---

## Quick Start

### 1 — Clone

```bash
git clone <repo-url> toolsforteaching
cd toolsforteaching
```

### 2 — Configure the backend

```bash
cp api/.example.config.json api/.config.json
```

Edit `api/.config.json` with your database credentials and Web3Forms key:

```json
{
  "db_host":            "localhost",
  "db_name":            "tft_db",
  "db_user":            "YOUR_DB_USERNAME",
  "db_pass":            "YOUR_DB_PASSWORD",
  "db_charset":         "utf8mb4",
  "token_expiry_hours": 24,
  "web3forms_key":      "YOUR_WEB3FORMS_ACCESS_KEY"
}
```

### 3 — Configure the frontend

```bash
cp public/.example.config.json public/.config.json
```

`public/.config.json` content (edit `web3formsKey`):

```json
{
  "apiBase":      "/api",
  "web3formsKey": "YOUR_WEB3FORMS_ACCESS_KEY"
}
```

During development, Vite proxies `/api` to `http://localhost`, so the same `apiBase` value works in both environments.

### 4 — Create the database

```bash
mysql -u root -p < database/schema.sql
```

Or run `database/schema.sql` in phpMyAdmin / HeidiSQL.

### 5 — Create the initial admin user

With Laragon running and `api/` served at `http://localhost/api`, open in a browser once:

```
http://localhost/api/setup.php
```

Note the credentials shown, then **delete `api/setup.php`** immediately.

### 6 — (Optional) Load sample data

```bash
mysql -u root -p tft_db < database/seed.sql
```

### 7 — Install frontend dependencies

```bash
npm install
```

### 8 — Start the dev server

```bash
npm run dev
```

The app runs at **http://localhost:5174**. Admin panel is at `/admin`.

### 9 — Build for production

```bash
npm run build
```

Deploy `dist/` to the site root alongside the `api/` folder. Ensure the web server can write to `public/images/` for uploaded screenshots.

---

## Folder Structure

```
toolsforteaching/
├── api/                           PHP REST API
│   ├── .example.config.json       Config template — commit this
│   ├── .config.json               Live credentials — gitignored
│   ├── .htaccess                  CORS + Authorization header passthrough
│   ├── config.php                 Reads .config.json; defines constants; getDB()
│   ├── helpers.php                cors(), jsonResponse(), requireAuth(), getBody()
│   ├── auth.php                   POST/GET/DELETE  login / verify / logout
│   ├── apps.php                   GET/POST/PUT/DELETE/PATCH  tools CRUD + reorder
│   ├── articles.php               GET/POST/PUT/DELETE/PATCH  articles CRUD + reorder
│   ├── users.php                  GET/PUT  own profile
│   ├── admin_users.php            GET/POST/DELETE  admin user management
│   ├── upload.php                 POST  image upload → public/images/
│   ├── setup.php                  One-time initial admin user creation (delete after use)
│   └── contact.php                POST  contact form relay via Web3Forms
│
├── database/
│   ├── schema.sql                 Full CREATE TABLE statements
│   ├── seed.sql                   Sample tools and articles
│   └── migrate_badge_colours.sql  ALTER TABLE for badge_bg/badge_fg (existing installs)
│
├── public/
│   ├── .example.config.json       Frontend config template — commit this
│   ├── .config.json               Live frontend config — gitignored
│   └── images/                    Uploaded tool screenshots
│
├── src/
│   ├── api/
│   │   └── client.js              Axios instance; loadConfig(), getConfig()
│   ├── hooks/
│   │   ├── useAuth.js             Login / logout / token verification
│   │   ├── useApps.js             Fetch public apps list
│   │   ├── useArticles.js         Fetch public articles list
│   │   └── useDragSort.js         HTML5 drag-and-drop reorder hook
│   ├── components/
│   │   ├── layout/                Header, Hero, Footer
│   │   ├── public/                ToolCard, ToolsGrid, ArticleCard, ArticlesGrid,
│   │   │                          MoreInfoModal, ContactModal
│   │   └── admin/                 AdminLogin, AdminPanel, AppForm, ArticleForm,
│   │                              UserSettings, AdminUsers, RichTextEditor
│   ├── styles/
│   │   └── main.css               Single stylesheet
│   ├── App.jsx                    Route definitions (/ and /admin)
│   └── main.jsx                   Entry point — loads config then mounts React
│
├── .gitignore
├── vite.config.js
├── package.json
├── LICENSE
└── README.md
```

---

## API Reference

All endpoints live under `/api/`. Public `GET` endpoints return active records only; authenticated requests return all records (including inactive).

### Authentication — `auth.php`

| Method | Endpoint     | Auth | Description |
|--------|--------------|------|-------------|
| POST   | `/auth.php`  | No   | Login — body: `{username, password}` — returns `{token, expires_at, user}` |
| GET    | `/auth.php`  | Yes  | Verify token — returns `{user}` |
| DELETE | `/auth.php`  | Yes  | Logout — revokes token |

### Tools — `apps.php`

| Method | Endpoint           | Auth | Description |
|--------|--------------------|------|-------------|
| GET    | `/apps.php`        | No*  | List tools |
| POST   | `/apps.php`        | Yes  | Create tool |
| PUT    | `/apps.php?id=X`   | Yes  | Update tool |
| DELETE | `/apps.php?id=X`   | Yes  | Delete tool |
| PATCH  | `/apps.php`        | Yes  | Bulk reorder — body: `[{id, sort_order}, …]` |

### Articles — `articles.php`

| Method | Endpoint               | Auth | Description |
|--------|------------------------|------|-------------|
| GET    | `/articles.php`        | No*  | List articles |
| POST   | `/articles.php`        | Yes  | Create article |
| PUT    | `/articles.php?id=X`   | Yes  | Update article |
| DELETE | `/articles.php?id=X`   | Yes  | Delete article |
| PATCH  | `/articles.php`        | Yes  | Bulk reorder — body: `[{id, sort_order}, …]` |

### User Profile — `users.php`

| Method | Endpoint     | Auth | Description |
|--------|--------------|------|-------------|
| GET    | `/users.php` | Yes  | Get own profile |
| PUT    | `/users.php` | Yes  | Update profile — email, stubs, optional password change |

### Admin Users — `admin_users.php`

| Method | Endpoint                  | Auth | Description |
|--------|---------------------------|------|-------------|
| GET    | `/admin_users.php`        | Yes  | List all admin users |
| POST   | `/admin_users.php`        | Yes  | Create admin user — body: `{username, email, password, …}` |
| DELETE | `/admin_users.php?id=X`   | Yes  | Delete user (cannot delete self — returns 403) |

### Image Upload — `upload.php`

| Method | Endpoint       | Auth | Description |
|--------|----------------|------|-------------|
| POST   | `/upload.php`  | Yes  | Multipart upload, field name `image`. Returns `{path}` |

### Contact — `contact.php`

| Method | Endpoint         | Auth | Description |
|--------|------------------|------|-------------|
| POST   | `/contact.php`   | No   | Relay contact form submission to Web3Forms |

---

## Database

Four tables: `users`, `apps`, `articles`, `auth_tokens`. See `database/schema.sql` for the full DDL.

### Upgrading an existing install (pre-v0.0.2)

If your `apps` table is missing `badge_bg` and `badge_fg` columns, run the migration:

```bash
mysql -u root -p tft_db < database/migrate_badge_colours.sql
```

---

## Development Notes

- **Auth header passthrough** — Apache / PHP-FPM strips `Authorization` headers in some configurations. The `api/.htaccess` includes a `RewriteRule` that copies it to `REDIRECT_HTTP_AUTHORIZATION`; `helpers.php` checks both.
- **Config loading** — `public/.config.json` is fetched at runtime before React mounts (`main.jsx`), so `apiBase` is available to the Axios client from the first request.
- **Badge colours** — `badge_bg` / `badge_fg` are stored as hex strings (e.g. `#4B8BBE`). When empty, the legacy `badge_class` CSS class is applied as a fallback for backward compatibility with seeded data.
- **Rich text** — `more_info_body` stores HTML output by Tiptap. It is rendered via `dangerouslySetInnerHTML` in the More Info modal. The source is admin-controlled, so the XSS surface is limited to authenticated users.
- **Drag-and-drop** — uses native HTML5 drag events via the `useDragSort` hook. On drop, sort orders are updated optimistically in state and then persisted via `PATCH`.

---

## License

Released under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE).

You are free to share and adapt this work for non-commercial purposes, provided you give appropriate credit and distribute your contributions under the same licence.

© 2024–2025 Simon Rundell, ITDD Department, Exeter and North Devon Colleges Group
