/*
  # Add Wedding Couple Value to Relationship Category Enum

  1. Changes
    - Add 'wedding_couple' value to relationship_category enum
    
  2. Purpose
    - Allow marking the wedding couple in the guests table
    - Enables proper categorization of the bride and groom
    
  3. Notes
    - This value will be used exclusively for the two people getting married
    - All other guests will use existing category values
*/

-- Add 'wedding_couple' to the relationship_category enum
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'wedding_couple' 
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'relationship_category')
  ) THEN
    ALTER TYPE relationship_category ADD VALUE 'wedding_couple';
  END IF;
END $$;
