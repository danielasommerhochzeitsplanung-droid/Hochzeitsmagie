/*
  # Create master_tasks table for simplified task library

  1. New Tables
    - `master_tasks`
      - `id` (uuid, primary key)
      - `category` (text) - Main category for the task
      - `sub_area` (text, nullable) - Optional sub-area within category
      - `sort_order` (integer) - Sort order within category/sub_area
      - `planning_hint` (text) - Simple planning phase hint: start, middle, final, after
      - `optional` (boolean) - Whether task is optional
      - `i18n_key` (text, unique) - Key for internationalization
      - `is_active` (boolean) - Whether task is currently active
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `master_tasks` table
    - Add policy for public read access (master tasks are reference data)
    - Add policy for authenticated users to read

  3. Important Notes
    - This is a SIMPLIFIED structure without any:
      - planning_duration_months
      - recommended_offset_months
      - latest_completion_months
      - due_date calculation logic
      - offset logic
    - Master tasks are reference data stored in database
    - User tasks remain stored locally
    - planning_hint is just a content hint, not logic
*/

CREATE TABLE IF NOT EXISTS master_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  sub_area text,
  sort_order integer NOT NULL DEFAULT 0,
  planning_hint text CHECK (planning_hint IN ('start', 'middle', 'final', 'after')),
  optional boolean DEFAULT false,
  i18n_key text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE master_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Master tasks are readable by everyone"
  ON master_tasks
  FOR SELECT
  USING (is_active = true);

CREATE INDEX IF NOT EXISTS idx_master_tasks_category ON master_tasks(category);
CREATE INDEX IF NOT EXISTS idx_master_tasks_sub_area ON master_tasks(sub_area);
CREATE INDEX IF NOT EXISTS idx_master_tasks_sort_order ON master_tasks(category, sub_area, sort_order);
