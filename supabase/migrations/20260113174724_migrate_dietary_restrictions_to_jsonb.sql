/*
  # Migrate dietary restrictions to JSONB field in guests table

  1. Changes
    - Add `dietary_restrictions` JSONB field to `guests` table
    - Migrate existing data from `dietary_restrictions` table to new JSON field
    - Mark old `dietary_restrictions` table as deprecated (but keep for data safety)

  2. JSON Structure
    The dietary_restrictions field will store:
    ```json
    {
      "name": "string",
      "is_vegetarian": boolean,
      "is_vegan": boolean,
      "is_lactose_intolerant": boolean,
      "is_gluten_intolerant": boolean,
      "is_halal": boolean,
      "allergies": "string",
      "allergy_nuts": boolean,
      "allergy_peanuts": boolean,
      "allergy_eggs": boolean,
      "allergy_fish": boolean,
      "allergy_shellfish": boolean,
      "allergy_soy": boolean,
      "allergy_sesame": boolean
    }
    ```

  3. Benefits
    - No separate queries needed
    - Data stays atomic with guest
    - Better performance
    - Simpler synchronization

  4. Notes
    - Old `dietary_restrictions` table is kept for data safety
    - Existing data is migrated automatically
    - Default value is empty JSON object
*/

-- Add dietary_restrictions JSONB field to guests table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'dietary_restrictions' AND data_type = 'jsonb'
  ) THEN
    -- First, drop the old text column if it exists
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'guests' AND column_name = 'dietary_restrictions' AND data_type = 'text'
    ) THEN
      ALTER TABLE guests DROP COLUMN dietary_restrictions;
    END IF;
    
    -- Add new JSONB column
    ALTER TABLE guests ADD COLUMN dietary_restrictions JSONB DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Migrate existing data from dietary_restrictions table to guests.dietary_restrictions JSONB field
DO $$
DECLARE
  dr_record RECORD;
  json_data JSONB;
BEGIN
  FOR dr_record IN 
    SELECT * FROM dietary_restrictions
  LOOP
    -- Build JSONB object from dietary_restrictions record
    json_data := jsonb_build_object(
      'name', COALESCE(dr_record.name, ''),
      'is_vegetarian', COALESCE(dr_record.is_vegetarian, false),
      'is_vegan', COALESCE(dr_record.is_vegan, false),
      'is_lactose_intolerant', COALESCE(dr_record.is_lactose_intolerant, false),
      'is_gluten_intolerant', COALESCE(dr_record.is_gluten_intolerant, false),
      'is_halal', COALESCE(dr_record.is_halal, false),
      'allergies', COALESCE(dr_record.allergies, ''),
      'allergy_nuts', COALESCE(dr_record.allergy_nuts, false),
      'allergy_peanuts', COALESCE(dr_record.allergy_peanuts, false),
      'allergy_eggs', COALESCE(dr_record.allergy_eggs, false),
      'allergy_fish', COALESCE(dr_record.allergy_fish, false),
      'allergy_shellfish', COALESCE(dr_record.allergy_shellfish, false),
      'allergy_soy', COALESCE(dr_record.allergy_soy, false),
      'allergy_sesame', COALESCE(dr_record.allergy_sesame, false)
    );
    
    -- Update the corresponding guest record
    UPDATE guests 
    SET dietary_restrictions = json_data
    WHERE id = dr_record.guest_id;
  END LOOP;
END $$;

-- Add comment to old table marking it as deprecated
COMMENT ON TABLE dietary_restrictions IS 'DEPRECATED: This table is no longer used. Dietary restrictions are now stored in guests.dietary_restrictions JSONB field. Kept for data safety only.';