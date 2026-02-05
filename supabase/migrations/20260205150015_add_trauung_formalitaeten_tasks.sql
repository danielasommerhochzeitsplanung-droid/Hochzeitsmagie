/*
  # Trauung & Formalitäten - Tasks

  Fügt Tasks für die Kategorie "trauung_formalitaeten" hinzu
  für 7 verschiedene Planungsdauern (6, 9, 12, 15, 18, 24, 30 Monate).

  ## Tasks (9 gesamt):
  
  **Phase 1 - Entscheidungen & Weichenstellung:**
  1. Standesamt kontaktieren / Contact Registry Office
  2. Dokumente beschaffen / Obtain Documents
  3. Termin beim Standesamt reservieren / Reserve Registry Office Appointment
  
  **Phase 2 - Organisation & Vorbereitung:**
  4. Trauzeugen auswählen / Select Witnesses
  5. Ehevertrag erstellen (optional) / Create Prenuptial Agreement (optional)
  6. Namensänderung besprechen / Discuss Name Change
  7. Dokumente beim Standesamt einreichen / Submit Documents to Registry Office
  
  **Phase 3 - Finalisierung:**
  8. Standesamtliche Trauung planen / Plan Civil Ceremony
  9. Trauungsurkunden bestellen / Order Marriage Certificates

  ## Planungsdauern und Zeiträume:
  
  - 6 Monate: Phase 1 (-6 bis -5), Phase 2 (-5 bis -2.5), Phase 3 (-2.5 bis -0.5)
  - 9 Monate: Phase 1 (-9 bis -7), Phase 2 (-7 bis -3), Phase 3 (-3 bis -0.5)
  - 12 Monate: Phase 1 (-12 bis -10), Phase 2 (-10 bis -3), Phase 3 (-3 bis -0.5)
  - 15 Monate: Phase 1 (-15 bis -13), Phase 2 (-13 bis -3), Phase 3 (-3 bis -0.5)
  - 18 Monate: Phase 1 (-18 bis -16), Phase 2 (-16 bis -3), Phase 3 (-3 bis -0.5)
  - 24 Monate: Phase 1 (-24 bis -22), Phase 2 (-22 bis -3), Phase 3 (-3 bis -0.5)
  - 30 Monate: Phase 1 (-30 bis -28), Phase 2 (-28 bis -3), Phase 3 (-3 bis -0.5)
*/

-- ============================================
-- 6 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1: Entscheidungen & Weichenstellung
(gen_random_uuid(), 'trauung_formalitaeten', 1, 1,
  'Standesamt kontaktieren', 'Contact Registry Office',
  'Ersten Kontakt mit dem Standesamt aufnehmen und Informationen zu Terminen und Dokumenten einholen', 'Make initial contact with the registry office and obtain information about appointments and documents',
  6, -6, -5, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 2,
  'Dokumente beschaffen', 'Obtain Documents',
  'Alle benötigten Dokumente (Geburtsurkunden, Personalausweise, etc.) besorgen', 'Obtain all required documents (birth certificates, ID cards, etc.)',
  6, -5.5, -5, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 3,
  'Termin beim Standesamt reservieren', 'Reserve Registry Office Appointment',
  'Offiziellen Trautermin beim Standesamt buchen', 'Book official wedding date at the registry office',
  6, -5, -5, true),

-- Phase 2: Organisation & Vorbereitung
(gen_random_uuid(), 'trauung_formalitaeten', 2, 1,
  'Trauzeugen auswählen', 'Select Witnesses',
  'Trauzeugen auswählen und fragen (falls gewünscht)', 'Select and ask witnesses (if desired)',
  6, -4.5, -2.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 2,
  'Ehevertrag erstellen (optional)', 'Create Prenuptial Agreement (optional)',
  'Bei Bedarf Notar kontaktieren und Ehevertrag aufsetzen', 'Contact notary if needed and create prenuptial agreement',
  6, -4, -2.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 3,
  'Namensänderung besprechen', 'Discuss Name Change',
  'Entscheidung über Namensführung nach der Hochzeit treffen', 'Decide on name usage after the wedding',
  6, -3.5, -2.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 4,
  'Dokumente beim Standesamt einreichen', 'Submit Documents to Registry Office',
  'Alle erforderlichen Unterlagen beim Standesamt abgeben', 'Submit all required documents to the registry office',
  6, -3, -2.5, true),

-- Phase 3: Finalisierung
(gen_random_uuid(), 'trauung_formalitaeten', 3, 1,
  'Standesamtliche Trauung planen', 'Plan Civil Ceremony',
  'Details der standesamtlichen Zeremonie festlegen (Räumlichkeit, Ablauf, Gäste)', 'Define details of the civil ceremony (venue, procedure, guests)',
  6, -2, -0.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 3, 2,
  'Trauungsurkunden bestellen', 'Order Marriage Certificates',
  'Anzahl der benötigten Trauungsurkunden festlegen und bestellen', 'Determine and order the number of required marriage certificates',
  6, -1, -0.5, false);

-- ============================================
-- 9 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'trauung_formalitaeten', 1, 1,
  'Standesamt kontaktieren', 'Contact Registry Office',
  'Ersten Kontakt mit dem Standesamt aufnehmen und Informationen zu Terminen und Dokumenten einholen', 'Make initial contact with the registry office and obtain information about appointments and documents',
  9, -9, -7, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 2,
  'Dokumente beschaffen', 'Obtain Documents',
  'Alle benötigten Dokumente (Geburtsurkunden, Personalausweise, etc.) besorgen', 'Obtain all required documents (birth certificates, ID cards, etc.)',
  9, -8, -7, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 3,
  'Termin beim Standesamt reservieren', 'Reserve Registry Office Appointment',
  'Offiziellen Trautermin beim Standesamt buchen', 'Book official wedding date at the registry office',
  9, -7, -7, true),

-- Phase 2
(gen_random_uuid(), 'trauung_formalitaeten', 2, 1,
  'Trauzeugen auswählen', 'Select Witnesses',
  'Trauzeugen auswählen und fragen (falls gewünscht)', 'Select and ask witnesses (if desired)',
  9, -6.5, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 2,
  'Ehevertrag erstellen (optional)', 'Create Prenuptial Agreement (optional)',
  'Bei Bedarf Notar kontaktieren und Ehevertrag aufsetzen', 'Contact notary if needed and create prenuptial agreement',
  9, -6, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 3,
  'Namensänderung besprechen', 'Discuss Name Change',
  'Entscheidung über Namensführung nach der Hochzeit treffen', 'Decide on name usage after the wedding',
  9, -5, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 4,
  'Dokumente beim Standesamt einreichen', 'Submit Documents to Registry Office',
  'Alle erforderlichen Unterlagen beim Standesamt abgeben', 'Submit all required documents to the registry office',
  9, -4, -3, true),

-- Phase 3
(gen_random_uuid(), 'trauung_formalitaeten', 3, 1,
  'Standesamtliche Trauung planen', 'Plan Civil Ceremony',
  'Details der standesamtlichen Zeremonie festlegen (Räumlichkeit, Ablauf, Gäste)', 'Define details of the civil ceremony (venue, procedure, guests)',
  9, -2.5, -0.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 3, 2,
  'Trauungsurkunden bestellen', 'Order Marriage Certificates',
  'Anzahl der benötigten Trauungsurkunden festlegen und bestellen', 'Determine and order the number of required marriage certificates',
  9, -1, -0.5, false);

-- ============================================
-- 12 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'trauung_formalitaeten', 1, 1,
  'Standesamt kontaktieren', 'Contact Registry Office',
  'Ersten Kontakt mit dem Standesamt aufnehmen und Informationen zu Terminen und Dokumenten einholen', 'Make initial contact with the registry office and obtain information about appointments and documents',
  12, -12, -10, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 2,
  'Dokumente beschaffen', 'Obtain Documents',
  'Alle benötigten Dokumente (Geburtsurkunden, Personalausweise, etc.) besorgen', 'Obtain all required documents (birth certificates, ID cards, etc.)',
  12, -11, -10, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 3,
  'Termin beim Standesamt reservieren', 'Reserve Registry Office Appointment',
  'Offiziellen Trautermin beim Standesamt buchen', 'Book official wedding date at the registry office',
  12, -10, -10, true),

-- Phase 2
(gen_random_uuid(), 'trauung_formalitaeten', 2, 1,
  'Trauzeugen auswählen', 'Select Witnesses',
  'Trauzeugen auswählen und fragen (falls gewünscht)', 'Select and ask witnesses (if desired)',
  12, -9, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 2,
  'Ehevertrag erstellen (optional)', 'Create Prenuptial Agreement (optional)',
  'Bei Bedarf Notar kontaktieren und Ehevertrag aufsetzen', 'Contact notary if needed and create prenuptial agreement',
  12, -8, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 3,
  'Namensänderung besprechen', 'Discuss Name Change',
  'Entscheidung über Namensführung nach der Hochzeit treffen', 'Decide on name usage after the wedding',
  12, -6, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 4,
  'Dokumente beim Standesamt einreichen', 'Submit Documents to Registry Office',
  'Alle erforderlichen Unterlagen beim Standesamt abgeben', 'Submit all required documents to the registry office',
  12, -5, -3, true),

-- Phase 3
(gen_random_uuid(), 'trauung_formalitaeten', 3, 1,
  'Standesamtliche Trauung planen', 'Plan Civil Ceremony',
  'Details der standesamtlichen Zeremonie festlegen (Räumlichkeit, Ablauf, Gäste)', 'Define details of the civil ceremony (venue, procedure, guests)',
  12, -2.5, -0.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 3, 2,
  'Trauungsurkunden bestellen', 'Order Marriage Certificates',
  'Anzahl der benötigten Trauungsurkunden festlegen und bestellen', 'Determine and order the number of required marriage certificates',
  12, -1, -0.5, false);

-- ============================================
-- 15 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'trauung_formalitaeten', 1, 1,
  'Standesamt kontaktieren', 'Contact Registry Office',
  'Ersten Kontakt mit dem Standesamt aufnehmen und Informationen zu Terminen und Dokumenten einholen', 'Make initial contact with the registry office and obtain information about appointments and documents',
  15, -15, -13, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 2,
  'Dokumente beschaffen', 'Obtain Documents',
  'Alle benötigten Dokumente (Geburtsurkunden, Personalausweise, etc.) besorgen', 'Obtain all required documents (birth certificates, ID cards, etc.)',
  15, -14, -13, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 3,
  'Termin beim Standesamt reservieren', 'Reserve Registry Office Appointment',
  'Offiziellen Trautermin beim Standesamt buchen', 'Book official wedding date at the registry office',
  15, -13, -13, true),

-- Phase 2
(gen_random_uuid(), 'trauung_formalitaeten', 2, 1,
  'Trauzeugen auswählen', 'Select Witnesses',
  'Trauzeugen auswählen und fragen (falls gewünscht)', 'Select and ask witnesses (if desired)',
  15, -12, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 2,
  'Ehevertrag erstellen (optional)', 'Create Prenuptial Agreement (optional)',
  'Bei Bedarf Notar kontaktieren und Ehevertrag aufsetzen', 'Contact notary if needed and create prenuptial agreement',
  15, -10, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 3,
  'Namensänderung besprechen', 'Discuss Name Change',
  'Entscheidung über Namensführung nach der Hochzeit treffen', 'Decide on name usage after the wedding',
  15, -8, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 4,
  'Dokumente beim Standesamt einreichen', 'Submit Documents to Registry Office',
  'Alle erforderlichen Unterlagen beim Standesamt abgeben', 'Submit all required documents to the registry office',
  15, -6, -3, true),

-- Phase 3
(gen_random_uuid(), 'trauung_formalitaeten', 3, 1,
  'Standesamtliche Trauung planen', 'Plan Civil Ceremony',
  'Details der standesamtlichen Zeremonie festlegen (Räumlichkeit, Ablauf, Gäste)', 'Define details of the civil ceremony (venue, procedure, guests)',
  15, -2.5, -0.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 3, 2,
  'Trauungsurkunden bestellen', 'Order Marriage Certificates',
  'Anzahl der benötigten Trauungsurkunden festlegen und bestellen', 'Determine and order the number of required marriage certificates',
  15, -1, -0.5, false);

-- ============================================
-- 18 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'trauung_formalitaeten', 1, 1,
  'Standesamt kontaktieren', 'Contact Registry Office',
  'Ersten Kontakt mit dem Standesamt aufnehmen und Informationen zu Terminen und Dokumenten einholen', 'Make initial contact with the registry office and obtain information about appointments and documents',
  18, -18, -16, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 2,
  'Dokumente beschaffen', 'Obtain Documents',
  'Alle benötigten Dokumente (Geburtsurkunden, Personalausweise, etc.) besorgen', 'Obtain all required documents (birth certificates, ID cards, etc.)',
  18, -17, -16, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 3,
  'Termin beim Standesamt reservieren', 'Reserve Registry Office Appointment',
  'Offiziellen Trautermin beim Standesamt buchen', 'Book official wedding date at the registry office',
  18, -16, -16, true),

-- Phase 2
(gen_random_uuid(), 'trauung_formalitaeten', 2, 1,
  'Trauzeugen auswählen', 'Select Witnesses',
  'Trauzeugen auswählen und fragen (falls gewünscht)', 'Select and ask witnesses (if desired)',
  18, -15, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 2,
  'Ehevertrag erstellen (optional)', 'Create Prenuptial Agreement (optional)',
  'Bei Bedarf Notar kontaktieren und Ehevertrag aufsetzen', 'Contact notary if needed and create prenuptial agreement',
  18, -12, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 3,
  'Namensänderung besprechen', 'Discuss Name Change',
  'Entscheidung über Namensführung nach der Hochzeit treffen', 'Decide on name usage after the wedding',
  18, -10, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 4,
  'Dokumente beim Standesamt einreichen', 'Submit Documents to Registry Office',
  'Alle erforderlichen Unterlagen beim Standesamt abgeben', 'Submit all required documents to the registry office',
  18, -7, -3, true),

-- Phase 3
(gen_random_uuid(), 'trauung_formalitaeten', 3, 1,
  'Standesamtliche Trauung planen', 'Plan Civil Ceremony',
  'Details der standesamtlichen Zeremonie festlegen (Räumlichkeit, Ablauf, Gäste)', 'Define details of the civil ceremony (venue, procedure, guests)',
  18, -2.5, -0.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 3, 2,
  'Trauungsurkunden bestellen', 'Order Marriage Certificates',
  'Anzahl der benötigten Trauungsurkunden festlegen und bestellen', 'Determine and order the number of required marriage certificates',
  18, -1, -0.5, false);

-- ============================================
-- 24 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'trauung_formalitaeten', 1, 1,
  'Standesamt kontaktieren', 'Contact Registry Office',
  'Ersten Kontakt mit dem Standesamt aufnehmen und Informationen zu Terminen und Dokumenten einholen', 'Make initial contact with the registry office and obtain information about appointments and documents',
  24, -24, -22, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 2,
  'Dokumente beschaffen', 'Obtain Documents',
  'Alle benötigten Dokumente (Geburtsurkunden, Personalausweise, etc.) besorgen', 'Obtain all required documents (birth certificates, ID cards, etc.)',
  24, -23, -22, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 3,
  'Termin beim Standesamt reservieren', 'Reserve Registry Office Appointment',
  'Offiziellen Trautermin beim Standesamt buchen', 'Book official wedding date at the registry office',
  24, -22, -22, true),

-- Phase 2
(gen_random_uuid(), 'trauung_formalitaeten', 2, 1,
  'Trauzeugen auswählen', 'Select Witnesses',
  'Trauzeugen auswählen und fragen (falls gewünscht)', 'Select and ask witnesses (if desired)',
  24, -20, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 2,
  'Ehevertrag erstellen (optional)', 'Create Prenuptial Agreement (optional)',
  'Bei Bedarf Notar kontaktieren und Ehevertrag aufsetzen', 'Contact notary if needed and create prenuptial agreement',
  24, -15, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 3,
  'Namensänderung besprechen', 'Discuss Name Change',
  'Entscheidung über Namensführung nach der Hochzeit treffen', 'Decide on name usage after the wedding',
  24, -12, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 4,
  'Dokumente beim Standesamt einreichen', 'Submit Documents to Registry Office',
  'Alle erforderlichen Unterlagen beim Standesamt abgeben', 'Submit all required documents to the registry office',
  24, -8, -3, true),

-- Phase 3
(gen_random_uuid(), 'trauung_formalitaeten', 3, 1,
  'Standesamtliche Trauung planen', 'Plan Civil Ceremony',
  'Details der standesamtlichen Zeremonie festlegen (Räumlichkeit, Ablauf, Gäste)', 'Define details of the civil ceremony (venue, procedure, guests)',
  24, -2.5, -0.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 3, 2,
  'Trauungsurkunden bestellen', 'Order Marriage Certificates',
  'Anzahl der benötigten Trauungsurkunden festlegen und bestellen', 'Determine and order the number of required marriage certificates',
  24, -1, -0.5, false);

-- ============================================
-- 30 MONATE PLANUNGSZEIT
-- ============================================

INSERT INTO task_templates (
  id, category, phase, order_in_phase,
  title_de, title_en,
  description_de, description_en,
  planning_duration_months,
  recommended_offset_months,
  latest_completion_months,
  is_critical
) VALUES
-- Phase 1
(gen_random_uuid(), 'trauung_formalitaeten', 1, 1,
  'Standesamt kontaktieren', 'Contact Registry Office',
  'Ersten Kontakt mit dem Standesamt aufnehmen und Informationen zu Terminen und Dokumenten einholen', 'Make initial contact with the registry office and obtain information about appointments and documents',
  30, -30, -28, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 2,
  'Dokumente beschaffen', 'Obtain Documents',
  'Alle benötigten Dokumente (Geburtsurkunden, Personalausweise, etc.) besorgen', 'Obtain all required documents (birth certificates, ID cards, etc.)',
  30, -29, -28, true),

(gen_random_uuid(), 'trauung_formalitaeten', 1, 3,
  'Termin beim Standesamt reservieren', 'Reserve Registry Office Appointment',
  'Offiziellen Trautermin beim Standesamt buchen', 'Book official wedding date at the registry office',
  30, -28, -28, true),

-- Phase 2
(gen_random_uuid(), 'trauung_formalitaeten', 2, 1,
  'Trauzeugen auswählen', 'Select Witnesses',
  'Trauzeugen auswählen und fragen (falls gewünscht)', 'Select and ask witnesses (if desired)',
  30, -25, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 2,
  'Ehevertrag erstellen (optional)', 'Create Prenuptial Agreement (optional)',
  'Bei Bedarf Notar kontaktieren und Ehevertrag aufsetzen', 'Contact notary if needed and create prenuptial agreement',
  30, -20, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 3,
  'Namensänderung besprechen', 'Discuss Name Change',
  'Entscheidung über Namensführung nach der Hochzeit treffen', 'Decide on name usage after the wedding',
  30, -15, -3, false),

(gen_random_uuid(), 'trauung_formalitaeten', 2, 4,
  'Dokumente beim Standesamt einreichen', 'Submit Documents to Registry Office',
  'Alle erforderlichen Unterlagen beim Standesamt abgeben', 'Submit all required documents to the registry office',
  30, -10, -3, true),

-- Phase 3
(gen_random_uuid(), 'trauung_formalitaeten', 3, 1,
  'Standesamtliche Trauung planen', 'Plan Civil Ceremony',
  'Details der standesamtlichen Zeremonie festlegen (Räumlichkeit, Ablauf, Gäste)', 'Define details of the civil ceremony (venue, procedure, guests)',
  30, -2.5, -0.5, false),

(gen_random_uuid(), 'trauung_formalitaeten', 3, 2,
  'Trauungsurkunden bestellen', 'Order Marriage Certificates',
  'Anzahl der benötigten Trauungsurkunden festlegen und bestellen', 'Determine and order the number of required marriage certificates',
  30, -1, -0.5, false);
