/*
  # Fix dietary restrictions to be JSONB array

  1. Changes
    - Update dietary_restrictions field in guests table to properly handle arrays
    - Migrate existing data to array format (multiple persons per guest)

  2. Notes
    - Each guest can have multiple persons with dietary restrictions (guest + partner)
    - Array structure allows for this flexibility
    - Empty array is the default for guests without restrictions
*/

-- Update existing dietary_restrictions to be arrays
DO $$
DECLARE
  guest_record RECORD;
  restrictions_array JSONB;
  dr_record RECORD;
BEGIN
  FOR guest_record IN 
    SELECT id FROM guests
  LOOP
    restrictions_array := '[]'::jsonb;
    
    -- Collect all dietary_restrictions for this guest
    FOR dr_record IN 
      SELECT * FROM dietary_restrictions WHERE guest_id = guest_record.id
    LOOP
      restrictions_array := restrictions_array || jsonb_build_array(
        jsonb_build_object(
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
          'allergy_sesame', COALESCE(dr_record.allergy_sesame, false),
          'has_allergies', COALESCE(
            dr_record.allergy_nuts OR 
            dr_record.allergy_peanuts OR 
            dr_record.allergy_eggs OR 
            dr_record.allergy_fish OR 
            dr_record.allergy_shellfish OR 
            dr_record.allergy_soy OR 
            dr_record.allergy_sesame OR 
            (dr_record.allergies IS NOT NULL AND dr_record.allergies != ''),
            false
          )
        )
      );
    END LOOP;
    
    -- Update the guest record with the array
    IF jsonb_array_length(restrictions_array) > 0 THEN
      UPDATE guests 
      SET dietary_restrictions = restrictions_array
      WHERE id = guest_record.id;
    ELSE
      UPDATE guests 
      SET dietary_restrictions = '[]'::jsonb
      WHERE id = guest_record.id;
    END IF;
  END LOOP;
END $$;