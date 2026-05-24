-- ============================================================
-- Tools for Teaching - Database Schema
-- Creative Commons BY-NC-SA 4.0 - https://creativecommons.org/licenses/by-nc-sa/4.0/
-- ============================================================

CREATE DATABASE IF NOT EXISTS tft_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tft_db;

-- Admin users
CREATE TABLE IF NOT EXISTS users (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  username        VARCHAR(100)  NOT NULL UNIQUE,
  email           VARCHAR(255)  NOT NULL,
  password_hash   VARCHAR(255)  NOT NULL,
  github_url_stub VARCHAR(255)  NOT NULL DEFAULT '',  -- e.g. 'SimonRundell'
  buymeacoffee_url VARCHAR(255) NOT NULL DEFAULT '',  -- e.g. 'https://buymeacoffee.com/simonrundell'
  college_email   VARCHAR(255)  NOT NULL DEFAULT '',  -- e.g. institutional email
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Teaching tools / apps
CREATE TABLE IF NOT EXISTS apps (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  app_key         VARCHAR(100)  NOT NULL UNIQUE,     -- slug, e.g. 'think2code'
  title           VARCHAR(255)  NOT NULL,
  description     TEXT          NOT NULL,
  image_path      VARCHAR(500)  NOT NULL DEFAULT '', -- relative path, e.g. 'images/foo.jpg'
  image_alt       VARCHAR(255)  NOT NULL DEFAULT '',
  badge           VARCHAR(100)  NOT NULL DEFAULT '',
  badge_class     VARCHAR(100)  NOT NULL DEFAULT '',
  badge_bg        VARCHAR(20)   NOT NULL DEFAULT '',  -- custom background #hex (overrides badge_class)
  badge_fg        VARCHAR(20)   NOT NULL DEFAULT '',  -- custom text colour #hex
  launch_url      VARCHAR(500)  NOT NULL DEFAULT '',
  github_url      VARCHAR(500)  NOT NULL DEFAULT '', -- full URL (blank = not on GitHub)
  more_info_title VARCHAR(255)  NOT NULL DEFAULT '',
  more_info_body  LONGTEXT      NOT NULL,
  sort_order      INT           NOT NULL DEFAULT 0,
  author_id       INT           DEFAULT NULL,
  active          TINYINT(1)    NOT NULL DEFAULT 1,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Articles (Medium / external links with stored metadata)
CREATE TABLE IF NOT EXISTS articles (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  medium_url      VARCHAR(500)  NOT NULL DEFAULT '',
  title           VARCHAR(255)  NOT NULL,
  author_name     VARCHAR(255)  NOT NULL DEFAULT '',
  description     TEXT          NOT NULL,
  thumbnail_url   VARCHAR(500)  NOT NULL DEFAULT '',
  sort_order      INT           NOT NULL DEFAULT 0,
  author_id       INT           DEFAULT NULL,
  active          TINYINT(1)    NOT NULL DEFAULT 1,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Auth tokens (Bearer token per session)
CREATE TABLE IF NOT EXISTS auth_tokens (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT          NOT NULL,
  token       VARCHAR(255) NOT NULL UNIQUE,
  expires_at  TIMESTAMP    NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
