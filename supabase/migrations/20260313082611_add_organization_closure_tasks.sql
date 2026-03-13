/*
  # Add Organization & Closure Tasks

  1. Overview
    - Adds comprehensive task templates for the "organization_closure" category
    - Uses 3-phase system as per existing constraint
    - Uses negative latest_completion_months for post-wedding tasks (e.g., -2 = 2 months after wedding)
    - sub_area is NULL for all tasks in this category
    - ID pattern: organization_closure_{phase}_{order}

  2. Phase Structure
    
    **Phase 1: Vorbereitung & Planung (30-3 months before)**
    - Initial setup and planning
    - Organizing documentation systems
    - Creating checklists
    - Setting up closure procedures
    
    **Phase 2: Finale Vorbereitung (2 months before to day 0)**
    - Return preparation for borrowed items
    - Payment completion setup
    - Thank you card preparation
    - Immediate post-wedding task planning
    
    **Phase 3: Abschluss & Nachbereitung (day 0 to -6 months after)**
    - Immediate post-wedding tasks (returns, security)
    - Payment settlements and contract closures
    - Thank you cards and feedback
    - Photo/video review and distribution
    - Long-term archival and preservation

  3. Technical Details
    - All tasks use technical category name: "organization_closure"
    - sub_area: NULL for all tasks
    - planning_duration_months: >= 6 as per constraint
    - recommended_offset_months: When to start working on task
    - latest_completion_months: Deadline (negative = after wedding)
*/

-- Phase 1: Vorbereitung & Planung (30-3 months before)
INSERT INTO task_templates (id, category, sub_area, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase, is_critical)
VALUES
  ('organization_closure_1_1', 'organization_closure', NULL, 
   'Abschluss-Checkliste erstellen', 
   'Create closure checklist',
   'Umfassende Checkliste für alle Post-Wedding-Aufgaben erstellen (Rückgaben, Zahlungen, Danksagungen, Archivierung)',
   'Create comprehensive checklist for all post-wedding tasks (returns, payments, thank yous, archiving)',
   30, 3, 27, 1, 1, true),
   
  ('organization_closure_1_2', 'organization_closure', NULL,
   'Dokumentations-System einrichten',
   'Set up documentation system',
   'System zur Verwaltung aller Belege, Verträge, Zahlungsnachweise und Dokumente einrichten',
   'Set up system to manage all receipts, contracts, payment proofs and documents',
   30, 3, 27, 1, 2, true),
   
  ('organization_closure_1_3', 'organization_closure', NULL,
   'Geschenkeliste-Vorlage vorbereiten',
   'Prepare gift list template',
   'Vorlage für Geschenkeliste mit Spalten für Schenker, Geschenk und Danksagungsstatus erstellen',
   'Create gift list template with columns for giver, gift and thank you status',
   30, 3, 27, 1, 3, false),
   
  ('organization_closure_1_4', 'organization_closure', NULL,
   'Archivierungs-Strategie planen',
   'Plan archiving strategy',
   'Strategie für langfristige Archivierung von Fotos, Videos, Dokumenten und Erinnerungsstücken planen',
   'Plan strategy for long-term archiving of photos, videos, documents and keepsakes',
   30, 3, 27, 1, 4, false);

-- Phase 2: Finale Vorbereitung (2 months before to day 0)
INSERT INTO task_templates (id, category, sub_area, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase, is_critical)
VALUES
  ('organization_closure_2_1', 'organization_closure', NULL,
   'Rückgabeliste für geliehene Gegenstände',
   'Create return list for borrowed items',
   'Detaillierte Liste aller geliehenen/gemieteten Gegenstände mit Rückgabefristen und Kontakten erstellen',
   'Create detailed list of all borrowed/rented items with return deadlines and contacts',
   2, 0, 6, 2, 1, true),
   
  ('organization_closure_2_2', 'organization_closure', NULL,
   'Dankeskarten vorbereiten',
   'Prepare thank you cards',
   'Dankeskarten bestellen, adressieren und mit personalisierten Nachrichten vorbereiten',
   'Order, address and prepare thank you cards with personalized messages',
   2, 0, 6, 2, 2, true),
   
  ('organization_closure_2_3', 'organization_closure', NULL,
   'Finale Zahlungsübersicht erstellen',
   'Create final payment overview',
   'Übersicht aller ausstehenden Zahlungen an Dienstleister mit Fälligkeiten erstellen',
   'Create overview of all outstanding vendor payments with due dates',
   2, 0, 6, 2, 3, true),
   
  ('organization_closure_2_4', 'organization_closure', NULL,
   'Post-Wedding Aufgaben-Zeitplan',
   'Post-wedding task schedule',
   'Detaillierten Zeitplan für alle Aufgaben nach der Hochzeit erstellen',
   'Create detailed schedule for all post-wedding tasks',
   2, 0, 6, 2, 4, false);

-- Phase 3: Abschluss & Nachbereitung (day 0 to -6 months after)
-- Immediate tasks (day 0)
INSERT INTO task_templates (id, category, sub_area, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase, is_critical)
VALUES
  ('organization_closure_3_1', 'organization_closure', NULL,
   'Geliehene/gemietete Gegenstände zurückgeben',
   'Return borrowed/rented items',
   'Alle geliehenen oder gemieteten Gegenstände (Dekoration, Ausstattung, etc.) unverzüglich zurückgeben',
   'Return all borrowed or rented items (decoration, equipment, etc.) immediately',
   0, 0, 6, 3, 1, true),
   
  ('organization_closure_3_2', 'organization_closure', NULL,
   'Geschenke und Dokumente sichern',
   'Secure gifts and documents',
   'Alle Hochzeitsgeschenke, wichtige Dokumente und Wertgegenstände an einem sicheren Ort aufbewahren',
   'Store all wedding gifts, important documents and valuables in a secure location',
   0, 0, 6, 3, 2, true);

-- Tasks within first month after wedding (0 to -1 month)
INSERT INTO task_templates (id, category, sub_area, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase, is_critical)
VALUES
  ('organization_closure_3_3', 'organization_closure', NULL,
   'Erste Zahlungsabschlüsse mit Dienstleistern',
   'Initial vendor payment completion',
   'Ausstehende Restzahlungen an Dienstleister begleichen und Belege sammeln',
   'Settle outstanding final payments to vendors and collect receipts',
   0, -1, 6, 3, 3, true),
   
  ('organization_closure_3_4', 'organization_closure', NULL,
   'Verträge auf Vollständigkeit prüfen',
   'Verify contract completion',
   'Alle Dienstleisterverträge auf vollständige Erfüllung prüfen und dokumentieren',
   'Verify all vendor contracts for complete fulfillment and document',
   0, -1, 6, 3, 4, true),
   
  ('organization_closure_3_5', 'organization_closure', NULL,
   'Erste Danksagungen aussprechen',
   'Express initial thanks',
   'Persönliche Danksagungen an die wichtigsten Helfer und das Hochzeitsteam aussprechen',
   'Express personal thanks to key helpers and wedding team members',
   0, -1, 6, 3, 5, false);

-- Tasks within 2 months after wedding (0 to -2 months)
INSERT INTO task_templates (id, category, sub_area, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase, is_critical)
VALUES
  ('organization_closure_3_6', 'organization_closure', NULL,
   'Alle Dankeskarten versenden',
   'Send all thank you cards',
   'Personalisierte Dankeskarten an alle Gäste versenden',
   'Send personalized thank you cards to all guests',
   0, -2, 6, 3, 6, true),
   
  ('organization_closure_3_7', 'organization_closure', NULL,
   'Hochzeitsfotos/-videos prüfen und freigeben',
   'Review and approve wedding photos/videos',
   'Alle finalen Fotos und Videos vom Fotografen/Videografen prüfen und freigeben',
   'Review and approve all final photos and videos from photographer/videographer',
   0, -2, 6, 3, 7, true),
   
  ('organization_closure_3_8', 'organization_closure', NULL,
   'Geschenkeliste erstellen',
   'Create gift list',
   'Vollständige Liste aller erhaltenen Geschenke mit Schenkern erstellen',
   'Create complete list of all received gifts with givers',
   0, -2, 6, 3, 8, false),
   
  ('organization_closure_3_9', 'organization_closure', NULL,
   'Dienstleisterverträge formal abschließen',
   'Formally close vendor contracts',
   'Finale Abnahme aller Dienstleistungen und formeller Vertragsabschluss',
   'Final acceptance of all services and formal contract closure',
   0, -2, 6, 3, 9, true),
   
  ('organization_closure_3_10', 'organization_closure', NULL,
   'Budget-Endabrechnung erstellen',
   'Create final budget statement',
   'Vollständige Endabrechnung aller Hochzeitskosten erstellen und dokumentieren',
   'Create complete final statement of all wedding costs and document',
   0, -2, 6, 3, 10, true);

-- Tasks within 3 months after wedding (0 to -3 months)
INSERT INTO task_templates (id, category, sub_area, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase, is_critical)
VALUES
  ('organization_closure_3_11', 'organization_closure', NULL,
   'Fotos an Gäste und Beteiligte senden',
   'Send photos to guests and participants',
   'Auswahl der besten Fotos an Gäste und wichtige Beteiligte versenden',
   'Send selection of best photos to guests and key participants',
   0, -3, 6, 3, 11, false),
   
  ('organization_closure_3_12', 'organization_closure', NULL,
   'Fotos an Dienstleister senden',
   'Send photos to vendors',
   'Hochwertige Fotos an Dienstleister für deren Portfolio und Marketing senden',
   'Send high-quality photos to vendors for their portfolio and marketing',
   0, -3, 6, 3, 12, false),
   
  ('organization_closure_3_13', 'organization_closure', NULL,
   'Dienstleister-Bewertungen schreiben',
   'Write vendor reviews',
   'Bewertungen und Testimonials für alle Dienstleister verfassen',
   'Write reviews and testimonials for all vendors',
   0, -3, 6, 3, 13, false),
   
  ('organization_closure_3_14', 'organization_closure', NULL,
   'Geschenke umtauschen (falls nötig)',
   'Exchange gifts if needed',
   'Doppelte oder unpassende Geschenke umtauschen oder zurückgeben',
   'Exchange or return duplicate or unsuitable gifts',
   0, -3, 6, 3, 14, false),
   
  ('organization_closure_3_15', 'organization_closure', NULL,
   'Brautkleid und Anzug reinigen/konservieren',
   'Clean/preserve wedding attire',
   'Brautkleid und Hochzeitsanzug professionell reinigen und für Aufbewahrung konservieren',
   'Professionally clean and preserve wedding dress and suit for storage',
   0, -3, 6, 3, 15, false),
   
  ('organization_closure_3_16', 'organization_closure', NULL,
   'Hochzeitswebsite aktualisieren',
   'Update wedding website',
   'Hochzeitswebsite mit finalen Fotos aktualisieren oder archivieren/offline nehmen',
   'Update wedding website with final photos or archive/take offline',
   0, -3, 6, 3, 16, false);

-- Long-term tasks (0 to -6 months after)
INSERT INTO task_templates (id, category, sub_area, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, planning_duration_months, phase, order_in_phase, is_critical)
VALUES
  ('organization_closure_3_17', 'organization_closure', NULL,
   'Hochzeitsalbum erstellen',
   'Create wedding album',
   'Physisches oder digitales Hochzeitsalbum mit den besten Fotos erstellen',
   'Create physical or digital wedding album with best photos',
   0, -6, 6, 3, 17, false),
   
  ('organization_closure_3_18', 'organization_closure', NULL,
   'Alle Hochzeitsdokumente archivieren',
   'Archive all wedding documents',
   'Alle Verträge, Belege, Genehmigungen und Dokumente digital und physisch archivieren',
   'Archive all contracts, receipts, permits and documents digitally and physically',
   0, -6, 6, 3, 18, true),
   
  ('organization_closure_3_19', 'organization_closure', NULL,
   'Fotos und Videos sichern (Backup)',
   'Backup photos and videos',
   'Mehrfache Backups aller Hochzeitsfotos und -videos an verschiedenen Orten erstellen',
   'Create multiple backups of all wedding photos and videos in different locations',
   0, -6, 6, 3, 19, true),
   
  ('organization_closure_3_20', 'organization_closure', NULL,
   'Namensänderungen durchführen',
   'Process name changes',
   'Falls zutreffend: Namensänderung bei Behörden, Banken, Versicherungen etc. durchführen',
   'If applicable: Process name change with authorities, banks, insurance companies, etc.',
   0, -6, 6, 3, 20, false),
   
  ('organization_closure_3_21', 'organization_closure', NULL,
   'Erinnerungs-Box erstellen',
   'Create memory box',
   'Box mit wichtigen Erinnerungsstücken (Einladung, Menükarte, Accessoires, etc.) zusammenstellen',
   'Assemble box with important keepsakes (invitation, menu card, accessories, etc.)',
   0, -6, 6, 3, 21, false),
   
  ('organization_closure_3_22', 'organization_closure', NULL,
   'Gemeinsame Reflexion',
   'Joint reflection',
   'Gemeinsam über die Hochzeit reflektieren und Learnings festhalten',
   'Reflect together on the wedding and capture learnings',
   0, -6, 6, 3, 22, false);
