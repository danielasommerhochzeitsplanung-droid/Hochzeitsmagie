/*
  # Create Task Templates Table

  1. New Table: `task_templates`
    - `id` (uuid, primary key)
    - `category` (text) - Vendor/category name (e.g., "Location", "Fotograf")
    - `task_name` (text) - Name of the task
    - `description` (text) - Task description
    - `priority` (text) - Priority level
    - `default_duration` (integer) - Default duration in days
    - `timing_rules` (jsonb) - Rules for when task should appear based on planning window
      Example: {"3_months": true, "6_months": true, "9_months": false, "12_months": true}
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `task_templates` table
    - Allow all users to read templates (they're reference data)
    - Only authenticated users can modify (for future admin features)

  3. Notes
    - Templates are used to auto-generate tasks based on planning window
    - timing_rules keys: "immediate", "3_months", "6_months", "9_months", "12_months", "18_months"
    - System will check planning window and create appropriate tasks
*/

-- Create task_templates table
CREATE TABLE IF NOT EXISTS task_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  task_name text NOT NULL,
  description text DEFAULT '',
  priority text DEFAULT 'medium',
  default_duration integer DEFAULT 7,
  timing_rules jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read templates (reference data)
CREATE POLICY "Anyone can read task templates"
  ON task_templates
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert templates
CREATE POLICY "Authenticated users can insert task templates"
  ON task_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update templates
CREATE POLICY "Authenticated users can update task templates"
  ON task_templates
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete templates
CREATE POLICY "Authenticated users can delete task templates"
  ON task_templates
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_task_templates_category ON task_templates(category);