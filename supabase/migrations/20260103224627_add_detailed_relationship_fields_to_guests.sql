/*
  # Add detailed relationship fields to guests table

  ## Changes
  
  1. New Columns
    - `side` (text): Indicates which side the guest belongs to
      - Values: 'bride', 'groom', 'both'
      - Default: NULL (optional)
    
    - `specific_relationship` (text): The specific relationship role from dropdown
      - Examples: 'Mutter', 'Vater', 'Oma', 'Opa', 'Beste Freundin', etc.
      - Default: NULL (optional)
    
    - `custom_relationship` (text): Custom relationship when "Sonstiges" is selected
      - Only used when specific_relationship is 'Sonstiges'
      - Default: NULL (optional)

  ## Notes
  - All fields are optional to maintain backward compatibility
  - The existing `relationship_category` field remains unchanged
  - These fields provide more granular relationship information
*/

-- Add side field (bride, groom, or both)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'side'
  ) THEN
    ALTER TABLE guests ADD COLUMN side text;
  END IF;
END $$;

-- Add specific_relationship field for dropdown selection
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'specific_relationship'
  ) THEN
    ALTER TABLE guests ADD COLUMN specific_relationship text;
  END IF;
END $$;

-- Add custom_relationship field for free text when "Sonstiges" is selected
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'custom_relationship'
  ) THEN
    ALTER TABLE guests ADD COLUMN custom_relationship text;
  END IF;
END $$;