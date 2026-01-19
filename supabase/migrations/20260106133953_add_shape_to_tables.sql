/*
  # Tischformen zu Tables hinzufügen

  1. Änderungen
    - Fügt `shape` Spalte zur `tables` Tabelle hinzu
    - Unterstützte Formen: Rund, Rechteckig, Quadratisch, L-Form, U-Form, Lange Tafel, T-Form
    - Standard: 'round' (Rund)
  
  2. Hinweise
    - Bestehende Tische erhalten automatisch die Form 'round'
    - Die Form wird für die visuelle Darstellung und Sitzplatzplanung verwendet
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tables' AND column_name = 'shape'
  ) THEN
    ALTER TABLE tables ADD COLUMN shape text DEFAULT 'round' CHECK (shape IN ('round', 'rectangular', 'square', 'l_shape', 'u_shape', 'banquet', 't_shape'));
  END IF;
END $$;