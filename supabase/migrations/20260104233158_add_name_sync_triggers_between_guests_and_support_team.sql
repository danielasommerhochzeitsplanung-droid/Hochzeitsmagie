/*
  # Name Synchronization Between Guests and Support Team

  This migration adds automatic synchronization of names between the guests and support_team tables.

  1. Changes
    - Creates trigger function to sync guest name changes to support team
    - Creates trigger function to sync support team name changes to guests
    - Adds triggers on both tables to maintain data consistency

  2. Behavior
    - When a guest's name is updated, all linked support team entries are automatically updated
    - When a support team member's name is updated, the linked guest record is automatically updated
    - Prevents infinite loops by only updating when the name actually changes

  3. Notes
    - Synchronization works bidirectionally
    - Only updates linked records (where guest_id or support_team_id exists)
    - Maintains data integrity across both modules
*/

-- Function to sync guest name changes to support team
CREATE OR REPLACE FUNCTION sync_guest_name_to_support_team()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if name actually changed
  IF NEW.name IS DISTINCT FROM OLD.name THEN
    -- Update support team name where this guest is linked
    UPDATE support_team
    SET name = NEW.name
    WHERE guest_id = NEW.id
      AND name IS DISTINCT FROM NEW.name;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to sync support team name changes to guest
CREATE OR REPLACE FUNCTION sync_support_team_name_to_guest()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if name actually changed and guest is linked
  IF NEW.name IS DISTINCT FROM OLD.name AND NEW.guest_id IS NOT NULL THEN
    -- Update guest name where this support team member is linked
    UPDATE guests
    SET name = NEW.name
    WHERE id = NEW.guest_id
      AND name IS DISTINCT FROM NEW.name;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS trigger_sync_guest_name_to_support_team ON guests;
DROP TRIGGER IF EXISTS trigger_sync_support_team_name_to_guest ON support_team;

-- Create trigger on guests table
CREATE TRIGGER trigger_sync_guest_name_to_support_team
  AFTER UPDATE OF name ON guests
  FOR EACH ROW
  EXECUTE FUNCTION sync_guest_name_to_support_team();

-- Create trigger on support_team table
CREATE TRIGGER trigger_sync_support_team_name_to_guest
  AFTER UPDATE OF name ON support_team
  FOR EACH ROW
  EXECUTE FUNCTION sync_support_team_name_to_guest();
