/*
  # Tischnummer zu Tables hinzufügen

  1. Änderungen
    - Fügt `table_number` Spalte zur `tables` Tabelle hinzu
    - Standard: 1
    - Wird für die Tischnummerierung verwendet
  
  2. Hinweise
    - Bestehende Tische erhalten automatisch die Nummer 1
    - Die Nummer kann vom Benutzer angepasst werden
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tables' AND column_name = 'table_number'
  ) THEN
    ALTER TABLE tables ADD COLUMN table_number integer DEFAULT 1;
  END IF;
END $$;