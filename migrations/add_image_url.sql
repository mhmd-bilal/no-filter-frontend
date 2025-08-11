-- Migration: Add image_url to posts table
ALTER TABLE IF EXISTS posts 
ADD COLUMN IF NOT EXISTS image_url VARCHAR;
