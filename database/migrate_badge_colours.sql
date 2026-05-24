-- Migration: add badge_bg and badge_fg columns to apps
-- Run once against any database created from the old schema.sql
-- @license CC BY-NC-SA 4.0

USE tft_db;

ALTER TABLE apps
  ADD COLUMN badge_bg VARCHAR(20) NOT NULL DEFAULT '' COMMENT 'Custom background #hex — overrides badge_class when set',
  ADD COLUMN badge_fg VARCHAR(20) NOT NULL DEFAULT '' COMMENT 'Custom text colour #hex';
