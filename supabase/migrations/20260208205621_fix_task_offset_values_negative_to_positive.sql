/*
  # Fix task offset values - convert negative to positive

  ## Problem
  Task templates use negative offsets (e.g., -6, -5.5) but the code already 
  subtracts the offset from the wedding date. This causes double negation:
  - Wedding date: 23.12.2026
  - Offset: -6 months
  - Calculation: 23.12.2026 - (-6) = 23.12.2026 + 6 = June 2027 ❌
  
  ## Solution
  Convert all negative offsets to positive values so the subtraction works correctly:
  - Wedding date: 23.12.2026
  - Offset: 6 months (positive)
  - Calculation: 23.12.2026 - 6 = June 2026 ✅

  ## Changes
  1. Convert `recommended_offset_months` from negative to positive (multiply by -1)
  2. Convert `latest_completion_months` from negative to positive (multiply by -1)
  
  ## Technical Details
  - Both columns are of type `numeric`
  - Only updates values that are less than 0 (negative)
  - Multiplies by -1 to convert to positive
*/

-- Update recommended_offset_months: convert negative to positive
UPDATE task_templates
SET recommended_offset_months = recommended_offset_months * -1
WHERE recommended_offset_months < 0;

-- Update latest_completion_months: convert negative to positive
UPDATE task_templates
SET latest_completion_months = latest_completion_months * -1
WHERE latest_completion_months < 0;
