/*
  # Add item_name and is_auto_synced to Budget Items

  1. Changes to `budget_items` table
    - Add `item_name` (text) - Name/description of the budget item
    - Add `is_auto_synced` (boolean) - Flag to track if this item was auto-created from vendor data
    
  2. Purpose
    - `item_name` allows budget items to have a descriptive name separate from category
    - `is_auto_synced` helps track vendor-linked budget items to show sync warnings
    
  3. Notes
    - Existing rows will have NULL item_name (can be updated later)
    - is_auto_synced defaults to false for manual entries
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'budget_items' AND column_name = 'item_name'
  ) THEN
    ALTER TABLE budget_items ADD COLUMN item_name text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'budget_items' AND column_name = 'is_auto_synced'
  ) THEN
    ALTER TABLE budget_items ADD COLUMN is_auto_synced boolean DEFAULT false NOT NULL;
  END IF;
END $$;