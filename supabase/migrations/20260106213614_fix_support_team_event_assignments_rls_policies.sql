/*
  # Fix RLS Policies for Support Team Event Assignments
  
  1. Problem
    - Current policies use `TO authenticated` which blocks anonymous users
    - App runs without authentication, so anonymous access is required
  
  2. Changes
    - Drop existing restrictive policies
    - Create new policies without role restrictions (applies to all roles including anon)
    - Allows anonymous users to perform all CRUD operations
  
  3. Affected Table
    - `support_team_event_assignments`
  
  4. Security Note
    - Consistent with other tables in the app (guests, events, vendors, etc.)
    - App is designed for single-user/private use without authentication
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Support team event assignments are publicly readable" ON support_team_event_assignments;
DROP POLICY IF EXISTS "Authenticated users can insert support team event assignments" ON support_team_event_assignments;
DROP POLICY IF EXISTS "Authenticated users can update support team event assignments" ON support_team_event_assignments;
DROP POLICY IF EXISTS "Authenticated users can delete support team event assignments" ON support_team_event_assignments;

-- Create new policies for all users (including anonymous)
CREATE POLICY "Anyone can read support team event assignments"
  ON support_team_event_assignments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert support team event assignments"
  ON support_team_event_assignments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update support team event assignments"
  ON support_team_event_assignments FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete support team event assignments"
  ON support_team_event_assignments FOR DELETE
  USING (true);
