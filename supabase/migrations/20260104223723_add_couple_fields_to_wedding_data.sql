/*
  # Add Couple Management Fields to Wedding Data

  1. Changes
    - Add `person1_guest_id` - Reference to first person's guest entry
    - Add `person2_guest_id` - Reference to second person's guest entry  
    - Add `person1_gender` - Gender of first person ('male' or 'female')
    - Add `person2_gender` - Gender of second person ('male' or 'female')
    
  2. Purpose
    - Link wedding couple to their guest entries
    - Track genders to determine couple type (bride/groom vs same-gender)
    - Enable automatic guest creation and synchronization
    - Names stored in guests table, referenced here by ID
    
  3. Notes
    - Genders are only used for UI labels (Braut/Bräutigam vs Partner 1/2)
    - Names can be updated anytime and sync to guests module
    - Couple entries will be visible in regular guest list
*/

-- Add couple reference fields to wedding_data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'person1_guest_id'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN person1_guest_id uuid REFERENCES guests(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'person2_guest_id'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN person2_guest_id uuid REFERENCES guests(id) ON DELETE SET NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'person1_gender'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN person1_gender text CHECK (person1_gender IN ('male', 'female'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'wedding_data' AND column_name = 'person2_gender'
  ) THEN
    ALTER TABLE wedding_data ADD COLUMN person2_gender text CHECK (person2_gender IN ('male', 'female'));
  END IF;
END $$;