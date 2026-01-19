/*
  # Add Family and Children Support to Guests

  ## Overview
  This migration adds functionality to track family relationships and children within the guests table.
  
  ## New Columns Added to `guests` Table
  
  ### Family & Child Tracking:
  - `is_child` (boolean, default false) - Marks if this guest is a child
  - `parent_guest_id` (uuid, nullable) - References the parent guest for children
  - `date_of_birth` (date, nullable) - Date of birth to calculate age and track children
  - `age` (integer, nullable) - Current age (can be calculated from date_of_birth)
  
  ## Features Enabled
  
  1. **Family Structure:**
     - Parents can have multiple children linked to them
     - Children automatically inherit family context
  
  2. **Children Get Full Guest Features:**
     - All existing dietary restriction fields (vegetarian, vegan, allergies, halal, etc.)
     - Event participation tracking (wedding, pre-wedding, other events)
     - Contact information
     - Seating assignments
     - Gift tracking
     - Support team roles (e.g., flower children, ring bearers)
  
  3. **Age-Based Management:**
     - Track date of birth for precise age calculation
     - Age field for quick reference
  
  ## Security
  - RLS policies remain unchanged - children follow same access rules as adult guests
  - Foreign key ensures data integrity for parent-child relationships
*/

-- Add family and children fields to guests table
DO $$
BEGIN
  -- Add is_child field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'is_child'
  ) THEN
    ALTER TABLE guests ADD COLUMN is_child boolean DEFAULT false NOT NULL;
  END IF;

  -- Add parent_guest_id field with foreign key
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'parent_guest_id'
  ) THEN
    ALTER TABLE guests ADD COLUMN parent_guest_id uuid REFERENCES guests(id) ON DELETE CASCADE;
    CREATE INDEX IF NOT EXISTS idx_guests_parent_guest_id ON guests(parent_guest_id);
  END IF;

  -- Add date_of_birth field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE guests ADD COLUMN date_of_birth date;
  END IF;

  -- Add age field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'guests' AND column_name = 'age'
  ) THEN
    ALTER TABLE guests ADD COLUMN age integer;
  END IF;
END $$;

-- Add comment explaining the family structure
COMMENT ON COLUMN guests.is_child IS 'Indicates if this guest is a child';
COMMENT ON COLUMN guests.parent_guest_id IS 'References the parent guest for children';
COMMENT ON COLUMN guests.date_of_birth IS 'Date of birth - used to calculate age and track children';
COMMENT ON COLUMN guests.age IS 'Current age of the guest';