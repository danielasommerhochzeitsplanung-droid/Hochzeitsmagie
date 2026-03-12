/*
  # Add Guests & Communication Task Templates

  1. Purpose
    - Adds comprehensive task templates for the guests_communication main category
    - Covers guest list creation, save the date, invitations, RSVP tracking, and seating arrangements
    - Provides templates for 7 different planning durations (30, 24, 18, 15, 12, 9, 6 months)

  2. Task Structure
    - All tasks use category 'guests_communication'
    - Tasks are organized in 3 phases:
      - Phase 1: Guest list and save the date preparation
      - Phase 2: Invitation preparation and sending
      - Phase 3: RSVP tracking and seating arrangement
    - No sub_area assigned (NULL) as guests_communication has no sub-areas
    - All tasks are non-critical (is_critical = false)

  3. Planning Duration Variations
    - 30 months: Full timeline with earliest save the date
    - 24 months: Standard long-term planning
    - 18 months: Medium-term planning
    - 15 months: Shorter medium-term planning
    - 12 months: One-year planning
    - 9 months: Condensed planning
    - 6 months: Short-term planning (no save the date sending)

  4. Important Notes
    - 6-month planning intentionally excludes "Save the Date versenden" due to time constraints
    - All offset and completion times are carefully calibrated for each planning duration
    - Tasks include both German and English titles and descriptions
    - IDs are generated using category-duration-phase-order pattern
*/

-- Insert task templates for 30-month planning
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('guests_communication_30_1_1', 'guests_communication', NULL, 30, 1, 1, 'Gästeliste erstellen', 'Create guest list', 'Erste gemeinsame Gästeliste erstellen um einen Überblick über die geplante Gästezahl zu bekommen', 'Create an initial guest list to estimate the expected number of guests', 30, 26, false),
  ('guests_communication_30_1_2', 'guests_communication', NULL, 30, 1, 2, 'Save the Date vorbereiten', 'Prepare save the date', 'Format und Inhalt der Save the Date Information festlegen', 'Define format and content of the save the date information', 25, 23, false),
  ('guests_communication_30_1_3', 'guests_communication', NULL, 30, 1, 3, 'Save the Date versenden', 'Send save the date', 'Gäste frühzeitig über das Hochzeitsdatum informieren', 'Inform guests early about the wedding date', 23, 21, false),
  ('guests_communication_30_2_1', 'guests_communication', NULL, 30, 2, 1, 'Einladung vorbereiten', 'Prepare invitations', 'Einladungstext und Inhalte der Einladung festlegen', 'Define invitation wording and contents', 9, 7, false),
  ('guests_communication_30_2_2', 'guests_communication', NULL, 30, 2, 2, 'Einladungen versenden', 'Send invitations', 'Einladungen an alle Gäste verschicken', 'Send invitations to all guests', 7, 5, false),
  ('guests_communication_30_3_1', 'guests_communication', NULL, 30, 3, 1, 'Rückmeldungen verwalten', 'Track RSVPs', 'Eingehende Rückmeldungen der Gäste sammeln und aktualisieren', 'Collect and track guest responses', 3, 1, false),
  ('guests_communication_30_3_2', 'guests_communication', NULL, 30, 3, 2, 'Sitzordnung planen', 'Plan seating arrangement', 'Sitzordnung auf Basis der bestätigten Gäste planen', 'Plan seating arrangement based on confirmed guests', 1, 0.5, false);

-- Insert task templates for 24-month planning
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('guests_communication_24_1_1', 'guests_communication', NULL, 24, 1, 1, 'Gästeliste erstellen', 'Create guest list', 'Erste gemeinsame Gästeliste erstellen um einen Überblick über die geplante Gästezahl zu bekommen', 'Create an initial guest list to estimate the expected number of guests', 24, 21, false),
  ('guests_communication_24_1_2', 'guests_communication', NULL, 24, 1, 2, 'Save the Date vorbereiten', 'Prepare save the date', 'Format und Inhalt der Save the Date Information festlegen', 'Define format and content of the save the date information', 20, 18, false),
  ('guests_communication_24_1_3', 'guests_communication', NULL, 24, 1, 3, 'Save the Date versenden', 'Send save the date', 'Gäste frühzeitig über das Hochzeitsdatum informieren', 'Inform guests early about the wedding date', 18, 16, false),
  ('guests_communication_24_2_1', 'guests_communication', NULL, 24, 2, 1, 'Einladung vorbereiten', 'Prepare invitations', 'Einladungstext und Inhalte der Einladung festlegen', 'Define invitation wording and contents', 8, 6, false),
  ('guests_communication_24_2_2', 'guests_communication', NULL, 24, 2, 2, 'Einladungen versenden', 'Send invitations', 'Einladungen an alle Gäste verschicken', 'Send invitations to all guests', 6, 4, false),
  ('guests_communication_24_3_1', 'guests_communication', NULL, 24, 3, 1, 'Rückmeldungen verwalten', 'Track RSVPs', 'Eingehende Rückmeldungen der Gäste sammeln und aktualisieren', 'Collect and track guest responses', 3, 1, false),
  ('guests_communication_24_3_2', 'guests_communication', NULL, 24, 3, 2, 'Sitzordnung planen', 'Plan seating arrangement', 'Sitzordnung auf Basis der bestätigten Gäste planen', 'Plan seating arrangement based on confirmed guests', 1, 0.5, false);

-- Insert task templates for 18-month planning
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('guests_communication_18_1_1', 'guests_communication', NULL, 18, 1, 1, 'Gästeliste erstellen', 'Create guest list', 'Erste gemeinsame Gästeliste erstellen um einen Überblick über die geplante Gästezahl zu bekommen', 'Create an initial guest list to estimate the expected number of guests', 18, 16, false),
  ('guests_communication_18_1_2', 'guests_communication', NULL, 18, 1, 2, 'Save the Date vorbereiten', 'Prepare save the date', 'Format und Inhalt der Save the Date Information festlegen', 'Define format and content of the save the date information', 16, 14, false),
  ('guests_communication_18_1_3', 'guests_communication', NULL, 18, 1, 3, 'Save the Date versenden', 'Send save the date', 'Gäste frühzeitig über das Hochzeitsdatum informieren', 'Inform guests early about the wedding date', 14, 12, false),
  ('guests_communication_18_2_1', 'guests_communication', NULL, 18, 2, 1, 'Einladung vorbereiten', 'Prepare invitations', 'Einladungstext und Inhalte der Einladung festlegen', 'Define invitation wording and contents', 7, 5, false),
  ('guests_communication_18_2_2', 'guests_communication', NULL, 18, 2, 2, 'Einladungen versenden', 'Send invitations', 'Einladungen an alle Gäste verschicken', 'Send invitations to all guests', 5, 4, false),
  ('guests_communication_18_3_1', 'guests_communication', NULL, 18, 3, 1, 'Rückmeldungen verwalten', 'Track RSVPs', 'Eingehende Rückmeldungen der Gäste sammeln und aktualisieren', 'Collect and track guest responses', 3, 1, false),
  ('guests_communication_18_3_2', 'guests_communication', NULL, 18, 3, 2, 'Sitzordnung planen', 'Plan seating arrangement', 'Sitzordnung auf Basis der bestätigten Gäste planen', 'Plan seating arrangement based on confirmed guests', 1, 0.5, false);

-- Insert task templates for 15-month planning
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('guests_communication_15_1_1', 'guests_communication', NULL, 15, 1, 1, 'Gästeliste erstellen', 'Create guest list', 'Erste gemeinsame Gästeliste erstellen um einen Überblick über die geplante Gästezahl zu bekommen', 'Create an initial guest list to estimate the expected number of guests', 15, 13, false),
  ('guests_communication_15_1_2', 'guests_communication', NULL, 15, 1, 2, 'Save the Date vorbereiten', 'Prepare save the date', 'Format und Inhalt der Save the Date Information festlegen', 'Define format and content of the save the date information', 13, 11, false),
  ('guests_communication_15_1_3', 'guests_communication', NULL, 15, 1, 3, 'Save the Date versenden', 'Send save the date', 'Gäste frühzeitig über das Hochzeitsdatum informieren', 'Inform guests early about the wedding date', 11, 9, false),
  ('guests_communication_15_2_1', 'guests_communication', NULL, 15, 2, 1, 'Einladung vorbereiten', 'Prepare invitations', 'Einladungstext und Inhalte der Einladung festlegen', 'Define invitation wording and contents', 6, 4, false),
  ('guests_communication_15_2_2', 'guests_communication', NULL, 15, 2, 2, 'Einladungen versenden', 'Send invitations', 'Einladungen an alle Gäste verschicken', 'Send invitations to all guests', 4, 3, false),
  ('guests_communication_15_3_1', 'guests_communication', NULL, 15, 3, 1, 'Rückmeldungen verwalten', 'Track RSVPs', 'Eingehende Rückmeldungen der Gäste sammeln und aktualisieren', 'Collect and track guest responses', 2.5, 1, false),
  ('guests_communication_15_3_2', 'guests_communication', NULL, 15, 3, 2, 'Sitzordnung planen', 'Plan seating arrangement', 'Sitzordnung auf Basis der bestätigten Gäste planen', 'Plan seating arrangement based on confirmed guests', 1, 0.5, false);

-- Insert task templates for 12-month planning
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('guests_communication_12_1_1', 'guests_communication', NULL, 12, 1, 1, 'Gästeliste erstellen', 'Create guest list', 'Erste gemeinsame Gästeliste erstellen um einen Überblick über die geplante Gästezahl zu bekommen', 'Create an initial guest list to estimate the expected number of guests', 12, 10, false),
  ('guests_communication_12_1_2', 'guests_communication', NULL, 12, 1, 2, 'Save the Date vorbereiten', 'Prepare save the date', 'Format und Inhalt der Save the Date Information festlegen', 'Define format and content of the save the date information', 10, 9, false),
  ('guests_communication_12_1_3', 'guests_communication', NULL, 12, 1, 3, 'Save the Date versenden', 'Send save the date', 'Gäste frühzeitig über das Hochzeitsdatum informieren', 'Inform guests early about the wedding date', 9, 8, false),
  ('guests_communication_12_2_1', 'guests_communication', NULL, 12, 2, 1, 'Einladung vorbereiten', 'Prepare invitations', 'Einladungstext und Inhalte der Einladung festlegen', 'Define invitation wording and contents', 6, 5, false),
  ('guests_communication_12_2_2', 'guests_communication', NULL, 12, 2, 2, 'Einladungen versenden', 'Send invitations', 'Einladungen an alle Gäste verschicken', 'Send invitations to all guests', 5, 4, false),
  ('guests_communication_12_3_1', 'guests_communication', NULL, 12, 3, 1, 'Rückmeldungen verwalten', 'Track RSVPs', 'Eingehende Rückmeldungen der Gäste sammeln und aktualisieren', 'Collect and track guest responses', 3, 1, false),
  ('guests_communication_12_3_2', 'guests_communication', NULL, 12, 3, 2, 'Sitzordnung planen', 'Plan seating arrangement', 'Sitzordnung auf Basis der bestätigten Gäste planen', 'Plan seating arrangement based on confirmed guests', 1, 0.5, false);

-- Insert task templates for 9-month planning
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('guests_communication_9_1_1', 'guests_communication', NULL, 9, 1, 1, 'Gästeliste erstellen', 'Create guest list', 'Erste gemeinsame Gästeliste erstellen um einen Überblick über die geplante Gästezahl zu bekommen', 'Create an initial guest list to estimate the expected number of guests', 9, 7, false),
  ('guests_communication_9_1_2', 'guests_communication', NULL, 9, 1, 2, 'Save the Date vorbereiten', 'Prepare save the date', 'Format und Inhalt der Save the Date Information festlegen', 'Define format and content of the save the date information', 7, 6, false),
  ('guests_communication_9_1_3', 'guests_communication', NULL, 9, 1, 3, 'Save the Date versenden', 'Send save the date', 'Gäste frühzeitig über das Hochzeitsdatum informieren', 'Inform guests early about the wedding date', 6, 5, false),
  ('guests_communication_9_2_1', 'guests_communication', NULL, 9, 2, 1, 'Einladung vorbereiten', 'Prepare invitations', 'Einladungstext und Inhalte der Einladung festlegen', 'Define invitation wording and contents', 4, 3, false),
  ('guests_communication_9_2_2', 'guests_communication', NULL, 9, 2, 2, 'Einladungen versenden', 'Send invitations', 'Einladungen an alle Gäste verschicken', 'Send invitations to all guests', 3, 2, false),
  ('guests_communication_9_3_1', 'guests_communication', NULL, 9, 3, 1, 'Rückmeldungen verwalten', 'Track RSVPs', 'Eingehende Rückmeldungen der Gäste sammeln und aktualisieren', 'Collect and track guest responses', 2, 1, false),
  ('guests_communication_9_3_2', 'guests_communication', NULL, 9, 3, 2, 'Sitzordnung planen', 'Plan seating arrangement', 'Sitzordnung auf Basis der bestätigten Gäste planen', 'Plan seating arrangement based on confirmed guests', 1, 0.5, false);

-- Insert task templates for 6-month planning (no save the date sending)
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  ('guests_communication_6_1_1', 'guests_communication', NULL, 6, 1, 1, 'Gästeliste erstellen', 'Create guest list', 'Erste gemeinsame Gästeliste erstellen um einen Überblick über die geplante Gästezahl zu bekommen', 'Create an initial guest list to estimate the expected number of guests', 6, 5, false),
  ('guests_communication_6_1_2', 'guests_communication', NULL, 6, 1, 2, 'Save the Date vorbereiten', 'Prepare save the date', 'Format und Inhalt der Save the Date Information festlegen', 'Define format and content of the save the date information', 5, 4, false),
  ('guests_communication_6_2_1', 'guests_communication', NULL, 6, 2, 1, 'Einladung vorbereiten', 'Prepare invitations', 'Einladungstext und Inhalte der Einladung festlegen', 'Define invitation wording and contents', 4, 3, false),
  ('guests_communication_6_2_2', 'guests_communication', NULL, 6, 2, 2, 'Einladungen versenden', 'Send invitations', 'Einladungen an alle Gäste verschicken', 'Send invitations to all guests', 3, 2, false),
  ('guests_communication_6_3_1', 'guests_communication', NULL, 6, 3, 1, 'Rückmeldungen verwalten', 'Track RSVPs', 'Eingehende Rückmeldungen der Gäste sammeln und aktualisieren', 'Collect and track guest responses', 2, 1, false),
  ('guests_communication_6_3_2', 'guests_communication', NULL, 6, 3, 2, 'Sitzordnung planen', 'Plan seating arrangement', 'Sitzordnung auf Basis der bestätigten Gäste planen', 'Plan seating arrangement based on confirmed guests', 1, 0.5, false);
