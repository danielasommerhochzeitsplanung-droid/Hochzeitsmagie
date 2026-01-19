/*
  # Add relationship category to guests table

  1. Changes
    - Create ENUM type for relationship categories
    - Add `relationship_category` column to guests table
    
  2. Categories
    - immediate_family: Engste Familie
    - family: Familie
    - close_friends: Enge Freunde
    - friends: Freunde
    - colleagues: Arbeitskollegen
    - acquaintances: Bekannte
    - neighbors: Nachbarn
*/

-- Create enum type for relationship categories
DO $$ BEGIN
  CREATE TYPE relationship_category AS ENUM (
    'immediate_family',
    'family',
    'close_friends',
    'friends',
    'colleagues',
    'acquaintances',
    'neighbors'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add relationship_category column to guests table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'relationship_category'
  ) THEN
    ALTER TABLE guests ADD COLUMN relationship_category relationship_category;
  END IF;
END $$;