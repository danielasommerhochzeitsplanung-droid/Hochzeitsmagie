/*
  # Standardize Task Categories to Technical Names

  1. Changes
    - Updates all task categories from mixed naming conventions to standardized technical snake_case English names
    - Renames "Location & Ablauf" → "location_venue"
    - Renames "trauung_formalitaeten" → "ceremony_legal"
    - Ensures consistency across all task templates
  
  2. Technical Standard
    - Database: Technical snake_case English names (location_venue, ceremony_legal, etc.)
    - Frontend: Translations via i18n (de.json, en.json)
    - This prevents naming chaos and maintains clean database structure
  
  3. Category Mapping
    - location_venue → "Location & Ablauf" (DE) / "Location & Schedule" (EN)
    - ceremony_legal → "Trauung & Formalitäten" (DE) / "Ceremony & Legal" (EN)
    - vendors_services → "Dienstleister & Leistungen" (DE) / "Vendors & Services" (EN)
    - guests_communication → "Gäste & Kommunikation" (DE) / "Guests & Communication" (EN)
    - styling_atmosphere → "Gestaltung & Atmosphäre" (DE) / "Styling & Atmosphere" (EN)
    - organization_closure → "Organisation & Abschluss" (DE) / "Organization & Closure" (EN)
*/

-- Update existing categories to technical names
UPDATE task_templates 
SET category = 'location_venue' 
WHERE category = 'Location & Ablauf';

UPDATE task_templates 
SET category = 'ceremony_legal' 
WHERE category = 'trauung_formalitaeten';

-- Ensure all future categories follow the standard
-- Add a check constraint to enforce technical naming convention
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE constraint_name = 'task_templates_category_check'
  ) THEN
    ALTER TABLE task_templates 
    ADD CONSTRAINT task_templates_category_check 
    CHECK (category IN (
      'location_venue',
      'ceremony_legal', 
      'vendors_services',
      'guests_communication',
      'styling_atmosphere',
      'organization_closure'
    ));
  END IF;
END $$;