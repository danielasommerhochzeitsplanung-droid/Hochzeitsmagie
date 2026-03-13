/*
  # Complete styling_outfit Category with All Planning Durations

  1. Changes
    - Delete all existing styling_outfit tasks
    - Insert exact 84 tasks for all planning durations (30, 24, 18, 15, 12, 9, 6 months)
    - Each duration has 12 tasks across 3 phases with 4 tasks each
    - Includes descriptions in German and English
    
  2. Task Structure per Duration
    - Phase 1: Tasks 1-4 (Define styles and research)
    - Phase 2: Tasks 1-4 (Order and book services)
    - Phase 3: Tasks 1-4 (Final adjustments and preparations)
    - sub_areas: outfits_accessories, beauty_styling, rings
    - Critical tasks: outfit ordering and alterations
*/

-- Delete all existing styling_outfit tasks
DELETE FROM task_templates WHERE category = 'styling_outfit';

-- Insert all 84 tasks (7 durations × 12 tasks each)
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, sub_area, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
  -- 30 months planning duration (12 tasks)
  ('styling_outfit_30_1_1', 'styling_outfit', 30, 1, 1, 'outfits_accessories', 'Stil für Hochzeitsoutfits festlegen', 'Define wedding outfit style', 'Stilrichtung für Brautkleid Anzug und Gesamtlook festlegen.', 'Define the overall style for wedding outfits.', 12, 10, false),
  ('styling_outfit_30_1_2', 'styling_outfit', 30, 1, 2, 'outfits_accessories', 'Brautkleid und Hochzeitsoutfits recherchieren', 'Research wedding outfits', 'Brautkleider Anzüge und mögliche Anbieter recherchieren.', 'Research wedding dresses suits and possible providers.', 11, 9, false),
  ('styling_outfit_30_1_3', 'styling_outfit', 30, 1, 3, 'beauty_styling', 'Hair & Make-up Stil festlegen', 'Define hair and makeup style', 'Stilrichtung für Haare und Make-up festlegen.', 'Define the desired hair and makeup style.', 10, 8, false),
  ('styling_outfit_30_1_4', 'styling_outfit', 30, 1, 4, 'rings', 'Trauring-Stil festlegen', 'Define ring style', 'Material Stil und Form der Trauringe festlegen.', 'Define material style and shape of wedding rings.', 9, 7, false),
  ('styling_outfit_30_2_1', 'styling_outfit', 30, 2, 1, 'outfits_accessories', 'Brautkleid / Hochzeitsoutfits bestellen', 'Order wedding outfits', 'Brautkleid und Hochzeitsoutfits rechtzeitig bestellen um Lieferzeit und Änderungen zu berücksichtigen.', 'Order wedding outfits early to allow time for delivery and alterations.', 9, 7, true),
  ('styling_outfit_30_2_2', 'styling_outfit', 30, 2, 2, 'beauty_styling', 'Hair & Make-up Artist buchen', 'Book hair and makeup artist', 'Hair und Make-up Dienstleister auswählen und buchen.', 'Select and book hair and makeup artist.', 7, 5, false),
  ('styling_outfit_30_2_3', 'styling_outfit', 30, 2, 3, 'rings', 'Trauringe auswählen und bestellen', 'Select and order rings', 'Trauringe auswählen und Bestellung auslösen.', 'Select and order wedding rings.', 7, 5, false),
  ('styling_outfit_30_2_4', 'styling_outfit', 30, 2, 4, 'outfits_accessories', 'Accessoires auswählen', 'Choose accessories', 'Schmuck Schuhe und weitere Accessoires auswählen.', 'Choose jewelry shoes and other accessories.', 6, 4, false),
  ('styling_outfit_30_3_1', 'styling_outfit', 30, 3, 1, 'outfits_accessories', 'Kleid- und Outfitanpassungen durchführen', 'Complete outfit alterations', 'Änderungen an Brautkleid oder Anzug durchführen lassen.', 'Carry out final alterations for wedding outfits.', 2, 1, true),
  ('styling_outfit_30_3_2', 'styling_outfit', 30, 3, 2, 'beauty_styling', 'Probestyling durchführen', 'Complete hair and makeup trial', 'Hair und Make-up Probetermin durchführen.', 'Conduct the hair and makeup trial session.', 2, 1, false),
  ('styling_outfit_30_3_3', 'styling_outfit', 30, 3, 3, 'beauty_styling', 'Zeitplan für Getting Ready abstimmen', 'Confirm getting ready schedule', 'Zeitplan für Hair und Make-up am Hochzeitstag festlegen.', 'Confirm the getting ready schedule for the wedding day.', 1, 0.5, false),
  ('styling_outfit_30_3_4', 'styling_outfit', 30, 3, 4, 'rings', 'Ringe prüfen und abholen', 'Check and collect rings', 'Trauringe prüfen und rechtzeitig abholen.', 'Check and collect the wedding rings.', 1, 0.5, false),
  
  -- 24 months planning duration (12 tasks)
  ('styling_outfit_24_1_1', 'styling_outfit', 24, 1, 1, 'outfits_accessories', 'Stil für Hochzeitsoutfits festlegen', 'Define wedding outfit style', 'Stilrichtung für Brautkleid Anzug und Gesamtlook festlegen.', 'Define the overall style for wedding outfits.', 10, 8, false),
  ('styling_outfit_24_1_2', 'styling_outfit', 24, 1, 2, 'outfits_accessories', 'Brautkleid und Hochzeitsoutfits recherchieren', 'Research wedding outfits', 'Brautkleider Anzüge und mögliche Anbieter recherchieren.', 'Research wedding dresses suits and possible providers.', 9, 7, false),
  ('styling_outfit_24_1_3', 'styling_outfit', 24, 1, 3, 'beauty_styling', 'Hair & Make-up Stil festlegen', 'Define hair and makeup style', 'Stilrichtung für Haare und Make-up festlegen.', 'Define the desired hair and makeup style.', 8, 6, false),
  ('styling_outfit_24_1_4', 'styling_outfit', 24, 1, 4, 'rings', 'Trauring-Stil festlegen', 'Define ring style', 'Material Stil und Form der Trauringe festlegen.', 'Define material style and shape of wedding rings.', 7, 5, false),
  ('styling_outfit_24_2_1', 'styling_outfit', 24, 2, 1, 'outfits_accessories', 'Brautkleid / Hochzeitsoutfits bestellen', 'Order wedding outfits', 'Brautkleid und Hochzeitsoutfits rechtzeitig bestellen um Lieferzeit und Änderungen zu berücksichtigen.', 'Order wedding outfits early to allow time for delivery and alterations.', 7, 5, true),
  ('styling_outfit_24_2_2', 'styling_outfit', 24, 2, 2, 'beauty_styling', 'Hair & Make-up Artist buchen', 'Book hair and makeup artist', 'Hair und Make-up Dienstleister auswählen und buchen.', 'Select and book hair and makeup artist.', 6, 4, false),
  ('styling_outfit_24_2_3', 'styling_outfit', 24, 2, 3, 'rings', 'Trauringe auswählen und bestellen', 'Select and order rings', 'Trauringe auswählen und Bestellung auslösen.', 'Select and order wedding rings.', 6, 4, false),
  ('styling_outfit_24_2_4', 'styling_outfit', 24, 2, 4, 'outfits_accessories', 'Accessoires auswählen', 'Choose accessories', 'Schmuck Schuhe und weitere Accessoires auswählen.', 'Choose jewelry shoes and other accessories.', 5, 3, false),
  ('styling_outfit_24_3_1', 'styling_outfit', 24, 3, 1, 'outfits_accessories', 'Kleid- und Outfitanpassungen durchführen', 'Complete outfit alterations', 'Änderungen an Brautkleid oder Anzug durchführen lassen.', 'Carry out final alterations for wedding outfits.', 2, 1, true),
  ('styling_outfit_24_3_2', 'styling_outfit', 24, 3, 2, 'beauty_styling', 'Probestyling durchführen', 'Complete hair and makeup trial', 'Hair und Make-up Probetermin durchführen.', 'Conduct the hair and makeup trial session.', 2, 1, false),
  ('styling_outfit_24_3_3', 'styling_outfit', 24, 3, 3, 'beauty_styling', 'Zeitplan für Getting Ready abstimmen', 'Confirm getting ready schedule', 'Zeitplan für Hair und Make-up am Hochzeitstag festlegen.', 'Confirm the getting ready schedule for the wedding day.', 1, 0.5, false),
  ('styling_outfit_24_3_4', 'styling_outfit', 24, 3, 4, 'rings', 'Ringe prüfen und abholen', 'Check and collect rings', 'Trauringe prüfen und rechtzeitig abholen.', 'Check and collect the wedding rings.', 1, 0.5, false),
  
  -- 18 months planning duration (12 tasks)
  ('styling_outfit_18_1_1', 'styling_outfit', 18, 1, 1, 'outfits_accessories', 'Stil für Hochzeitsoutfits festlegen', 'Define wedding outfit style', 'Stilrichtung für Brautkleid Anzug und Gesamtlook festlegen.', 'Define the overall style for wedding outfits.', 8, 6, false),
  ('styling_outfit_18_1_2', 'styling_outfit', 18, 1, 2, 'outfits_accessories', 'Brautkleid und Hochzeitsoutfits recherchieren', 'Research wedding outfits', 'Brautkleider Anzüge und mögliche Anbieter recherchieren.', 'Research wedding dresses suits and possible providers.', 7, 5, false),
  ('styling_outfit_18_1_3', 'styling_outfit', 18, 1, 3, 'beauty_styling', 'Hair & Make-up Stil festlegen', 'Define hair and makeup style', 'Stilrichtung für Haare und Make-up festlegen.', 'Define the desired hair and makeup style.', 6, 4, false),
  ('styling_outfit_18_1_4', 'styling_outfit', 18, 1, 4, 'rings', 'Trauring-Stil festlegen', 'Define ring style', 'Material Stil und Form der Trauringe festlegen.', 'Define material style and shape of wedding rings.', 5, 4, false),
  ('styling_outfit_18_2_1', 'styling_outfit', 18, 2, 1, 'outfits_accessories', 'Brautkleid / Hochzeitsoutfits bestellen', 'Order wedding outfits', 'Brautkleid und Hochzeitsoutfits rechtzeitig bestellen um Lieferzeit und Änderungen zu berücksichtigen.', 'Order wedding outfits early to allow time for delivery and alterations.', 6, 4, true),
  ('styling_outfit_18_2_2', 'styling_outfit', 18, 2, 2, 'beauty_styling', 'Hair & Make-up Artist buchen', 'Book hair and makeup artist', 'Hair und Make-up Dienstleister auswählen und buchen.', 'Select and book hair and makeup artist.', 5, 3, false),
  ('styling_outfit_18_2_3', 'styling_outfit', 18, 2, 3, 'rings', 'Trauringe auswählen und bestellen', 'Select and order rings', 'Trauringe auswählen und Bestellung auslösen.', 'Select and order wedding rings.', 5, 3, false),
  ('styling_outfit_18_2_4', 'styling_outfit', 18, 2, 4, 'outfits_accessories', 'Accessoires auswählen', 'Choose accessories', 'Schmuck Schuhe und weitere Accessoires auswählen.', 'Choose jewelry shoes and other accessories.', 4, 2, false),
  ('styling_outfit_18_3_1', 'styling_outfit', 18, 3, 1, 'outfits_accessories', 'Kleid- und Outfitanpassungen durchführen', 'Complete outfit alterations', 'Änderungen an Brautkleid oder Anzug durchführen lassen.', 'Carry out final alterations for wedding outfits.', 2, 1, true),
  ('styling_outfit_18_3_2', 'styling_outfit', 18, 3, 2, 'beauty_styling', 'Probestyling durchführen', 'Complete hair and makeup trial', 'Hair und Make-up Probetermin durchführen.', 'Conduct the hair and makeup trial session.', 2, 1, false),
  ('styling_outfit_18_3_3', 'styling_outfit', 18, 3, 3, 'beauty_styling', 'Zeitplan für Getting Ready abstimmen', 'Confirm getting ready schedule', 'Zeitplan für Hair und Make-up am Hochzeitstag festlegen.', 'Confirm the getting ready schedule for the wedding day.', 1, 0.5, false),
  ('styling_outfit_18_3_4', 'styling_outfit', 18, 3, 4, 'rings', 'Ringe prüfen und abholen', 'Check and collect rings', 'Trauringe prüfen und rechtzeitig abholen.', 'Check and collect the wedding rings.', 1, 0.5, false),
  
  -- 15 months planning duration (12 tasks)
  ('styling_outfit_15_1_1', 'styling_outfit', 15, 1, 1, 'outfits_accessories', 'Stil für Hochzeitsoutfits festlegen', 'Define wedding outfit style', 'Stilrichtung für Brautkleid Anzug und Gesamtlook festlegen.', 'Define the overall style for wedding outfits.', 7, 5, false),
  ('styling_outfit_15_1_2', 'styling_outfit', 15, 1, 2, 'outfits_accessories', 'Brautkleid und Hochzeitsoutfits recherchieren', 'Research wedding outfits', 'Brautkleider Anzüge und mögliche Anbieter recherchieren.', 'Research wedding dresses suits and possible providers.', 6, 4, false),
  ('styling_outfit_15_1_3', 'styling_outfit', 15, 1, 3, 'beauty_styling', 'Hair & Make-up Stil festlegen', 'Define hair and makeup style', 'Stilrichtung für Haare und Make-up festlegen.', 'Define the desired hair and makeup style.', 5, 4, false),
  ('styling_outfit_15_1_4', 'styling_outfit', 15, 1, 4, 'rings', 'Trauring-Stil festlegen', 'Define ring style', 'Material Stil und Form der Trauringe festlegen.', 'Define material style and shape of wedding rings.', 4, 3, false),
  ('styling_outfit_15_2_1', 'styling_outfit', 15, 2, 1, 'outfits_accessories', 'Brautkleid / Hochzeitsoutfits bestellen', 'Order wedding outfits', 'Brautkleid und Hochzeitsoutfits rechtzeitig bestellen um Lieferzeit und Änderungen zu berücksichtigen.', 'Order wedding outfits early to allow time for delivery and alterations.', 5, 3, true),
  ('styling_outfit_15_2_2', 'styling_outfit', 15, 2, 2, 'beauty_styling', 'Hair & Make-up Artist buchen', 'Book hair and makeup artist', 'Hair und Make-up Dienstleister auswählen und buchen.', 'Select and book hair and makeup artist.', 4, 2, false),
  ('styling_outfit_15_2_3', 'styling_outfit', 15, 2, 3, 'rings', 'Trauringe auswählen und bestellen', 'Select and order rings', 'Trauringe auswählen und Bestellung auslösen.', 'Select and order wedding rings.', 4, 2, false),
  ('styling_outfit_15_2_4', 'styling_outfit', 15, 2, 4, 'outfits_accessories', 'Accessoires auswählen', 'Choose accessories', 'Schmuck Schuhe und weitere Accessoires auswählen.', 'Choose jewelry shoes and other accessories.', 3, 2, false),
  ('styling_outfit_15_3_1', 'styling_outfit', 15, 3, 1, 'outfits_accessories', 'Kleid- und Outfitanpassungen durchführen', 'Complete outfit alterations', 'Änderungen an Brautkleid oder Anzug durchführen lassen.', 'Carry out final alterations for wedding outfits.', 2, 1, true),
  ('styling_outfit_15_3_2', 'styling_outfit', 15, 3, 2, 'beauty_styling', 'Probestyling durchführen', 'Complete hair and makeup trial', 'Hair und Make-up Probetermin durchführen.', 'Conduct the hair and makeup trial session.', 2, 1, false),
  ('styling_outfit_15_3_3', 'styling_outfit', 15, 3, 3, 'beauty_styling', 'Zeitplan für Getting Ready abstimmen', 'Confirm getting ready schedule', 'Zeitplan für Hair und Make-up am Hochzeitstag festlegen.', 'Confirm the getting ready schedule for the wedding day.', 1, 0.5, false),
  ('styling_outfit_15_3_4', 'styling_outfit', 15, 3, 4, 'rings', 'Ringe prüfen und abholen', 'Check and collect rings', 'Trauringe prüfen und rechtzeitig abholen.', 'Check and collect the wedding rings.', 1, 0.5, false),
  
  -- 12 months planning duration (12 tasks)
  ('styling_outfit_12_1_1', 'styling_outfit', 12, 1, 1, 'outfits_accessories', 'Stil für Hochzeitsoutfits festlegen', 'Define wedding outfit style', 'Stilrichtung für Brautkleid Anzug und Gesamtlook festlegen.', 'Define the overall style for wedding outfits.', 6, 4, false),
  ('styling_outfit_12_1_2', 'styling_outfit', 12, 1, 2, 'outfits_accessories', 'Brautkleid und Hochzeitsoutfits recherchieren', 'Research wedding outfits', 'Brautkleider Anzüge und mögliche Anbieter recherchieren.', 'Research wedding dresses suits and possible providers.', 5, 3, false),
  ('styling_outfit_12_1_3', 'styling_outfit', 12, 1, 3, 'beauty_styling', 'Hair & Make-up Stil festlegen', 'Define hair and makeup style', 'Stilrichtung für Haare und Make-up festlegen.', 'Define the desired hair and makeup style.', 4, 3, false),
  ('styling_outfit_12_1_4', 'styling_outfit', 12, 1, 4, 'rings', 'Trauring-Stil festlegen', 'Define ring style', 'Material Stil und Form der Trauringe festlegen.', 'Define material style and shape of wedding rings.', 4, 2, false),
  ('styling_outfit_12_2_1', 'styling_outfit', 12, 2, 1, 'outfits_accessories', 'Brautkleid / Hochzeitsoutfits bestellen', 'Order wedding outfits', 'Brautkleid und Hochzeitsoutfits rechtzeitig bestellen um Lieferzeit und Änderungen zu berücksichtigen.', 'Order wedding outfits early to allow time for delivery and alterations.', 5, 3, true),
  ('styling_outfit_12_2_2', 'styling_outfit', 12, 2, 2, 'beauty_styling', 'Hair & Make-up Artist buchen', 'Book hair and makeup artist', 'Hair und Make-up Dienstleister auswählen und buchen.', 'Select and book hair and makeup artist.', 3, 2, false),
  ('styling_outfit_12_2_3', 'styling_outfit', 12, 2, 3, 'rings', 'Trauringe auswählen und bestellen', 'Select and order rings', 'Trauringe auswählen und Bestellung auslösen.', 'Select and order wedding rings.', 3, 2, false),
  ('styling_outfit_12_2_4', 'styling_outfit', 12, 2, 4, 'outfits_accessories', 'Accessoires auswählen', 'Choose accessories', 'Schmuck Schuhe und weitere Accessoires auswählen.', 'Choose jewelry shoes and other accessories.', 2, 1, false),
  ('styling_outfit_12_3_1', 'styling_outfit', 12, 3, 1, 'outfits_accessories', 'Kleid- und Outfitanpassungen durchführen', 'Complete outfit alterations', 'Änderungen an Brautkleid oder Anzug durchführen lassen.', 'Carry out final alterations for wedding outfits.', 2, 1, true),
  ('styling_outfit_12_3_2', 'styling_outfit', 12, 3, 2, 'beauty_styling', 'Probestyling durchführen', 'Complete hair and makeup trial', 'Hair und Make-up Probetermin durchführen.', 'Conduct the hair and makeup trial session.', 2, 1, false),
  ('styling_outfit_12_3_3', 'styling_outfit', 12, 3, 3, 'beauty_styling', 'Zeitplan für Getting Ready abstimmen', 'Confirm getting ready schedule', 'Zeitplan für Hair und Make-up am Hochzeitstag festlegen.', 'Confirm the getting ready schedule for the wedding day.', 1, 0.5, false),
  ('styling_outfit_12_3_4', 'styling_outfit', 12, 3, 4, 'rings', 'Ringe prüfen und abholen', 'Check and collect rings', 'Trauringe prüfen und rechtzeitig abholen.', 'Check and collect the wedding rings.', 1, 0.5, false),
  
  -- 9 months planning duration (12 tasks)
  ('styling_outfit_9_1_1', 'styling_outfit', 9, 1, 1, 'outfits_accessories', 'Stil für Hochzeitsoutfits festlegen', 'Define wedding outfit style', 'Stilrichtung für Brautkleid Anzug und Gesamtlook festlegen.', 'Define the overall style for wedding outfits.', 4, 3, false),
  ('styling_outfit_9_1_2', 'styling_outfit', 9, 1, 2, 'outfits_accessories', 'Brautkleid und Hochzeitsoutfits recherchieren', 'Research wedding outfits', 'Brautkleider Anzüge und mögliche Anbieter recherchieren.', 'Research wedding dresses suits and possible providers.', 4, 2, false),
  ('styling_outfit_9_1_3', 'styling_outfit', 9, 1, 3, 'beauty_styling', 'Hair & Make-up Stil festlegen', 'Define hair and makeup style', 'Stilrichtung für Haare und Make-up festlegen.', 'Define the desired hair and makeup style.', 3, 2, false),
  ('styling_outfit_9_1_4', 'styling_outfit', 9, 1, 4, 'rings', 'Trauring-Stil festlegen', 'Define ring style', 'Material Stil und Form der Trauringe festlegen.', 'Define material style and shape of wedding rings.', 3, 2, false),
  ('styling_outfit_9_2_1', 'styling_outfit', 9, 2, 1, 'outfits_accessories', 'Brautkleid / Hochzeitsoutfits bestellen', 'Order wedding outfits', 'Brautkleid und Hochzeitsoutfits rechtzeitig bestellen um Lieferzeit und Änderungen zu berücksichtigen.', 'Order wedding outfits early to allow time for delivery and alterations.', 4, 2, true),
  ('styling_outfit_9_2_2', 'styling_outfit', 9, 2, 2, 'beauty_styling', 'Hair & Make-up Artist buchen', 'Book hair and makeup artist', 'Hair und Make-up Dienstleister auswählen und buchen.', 'Select and book hair and makeup artist.', 2, 1, false),
  ('styling_outfit_9_2_3', 'styling_outfit', 9, 2, 3, 'rings', 'Trauringe auswählen und bestellen', 'Select and order rings', 'Trauringe auswählen und Bestellung auslösen.', 'Select and order wedding rings.', 2, 1, false),
  ('styling_outfit_9_2_4', 'styling_outfit', 9, 2, 4, 'outfits_accessories', 'Accessoires auswählen', 'Choose accessories', 'Schmuck Schuhe und weitere Accessoires auswählen.', 'Choose jewelry shoes and other accessories.', 2, 1, false),
  ('styling_outfit_9_3_1', 'styling_outfit', 9, 3, 1, 'outfits_accessories', 'Kleid- und Outfitanpassungen durchführen', 'Complete outfit alterations', 'Änderungen an Brautkleid oder Anzug durchführen lassen.', 'Carry out final alterations for wedding outfits.', 1, 0.5, true),
  ('styling_outfit_9_3_2', 'styling_outfit', 9, 3, 2, 'beauty_styling', 'Probestyling durchführen', 'Complete hair and makeup trial', 'Hair und Make-up Probetermin durchführen.', 'Conduct the hair and makeup trial session.', 1, 0.5, false),
  ('styling_outfit_9_3_3', 'styling_outfit', 9, 3, 3, 'beauty_styling', 'Zeitplan für Getting Ready abstimmen', 'Confirm getting ready schedule', 'Zeitplan für Hair und Make-up am Hochzeitstag festlegen.', 'Confirm the getting ready schedule for the wedding day.', 0.5, 0.5, false),
  ('styling_outfit_9_3_4', 'styling_outfit', 9, 3, 4, 'rings', 'Ringe prüfen und abholen', 'Check and collect rings', 'Trauringe prüfen und rechtzeitig abholen.', 'Check and collect the wedding rings.', 0.5, 0.5, false),
  
  -- 6 months planning duration (12 tasks)
  ('styling_outfit_6_1_1', 'styling_outfit', 6, 1, 1, 'outfits_accessories', 'Stil für Hochzeitsoutfits festlegen', 'Define wedding outfit style', 'Stilrichtung für Brautkleid Anzug und Gesamtlook festlegen.', 'Define the overall style for wedding outfits.', 3, 2, false),
  ('styling_outfit_6_1_2', 'styling_outfit', 6, 1, 2, 'outfits_accessories', 'Brautkleid und Hochzeitsoutfits recherchieren', 'Research wedding outfits', 'Brautkleider Anzüge und mögliche Anbieter recherchieren.', 'Research wedding dresses suits and possible providers.', 3, 2, false),
  ('styling_outfit_6_1_3', 'styling_outfit', 6, 1, 3, 'beauty_styling', 'Hair & Make-up Stil festlegen', 'Define hair and makeup style', 'Stilrichtung für Haare und Make-up festlegen.', 'Define the desired hair and makeup style.', 2, 1, false),
  ('styling_outfit_6_1_4', 'styling_outfit', 6, 1, 4, 'rings', 'Trauring-Stil festlegen', 'Define ring style', 'Material Stil und Form der Trauringe festlegen.', 'Define material style and shape of wedding rings.', 2, 1, false),
  ('styling_outfit_6_2_1', 'styling_outfit', 6, 2, 1, 'outfits_accessories', 'Brautkleid / Hochzeitsoutfits bestellen', 'Order wedding outfits', 'Brautkleid und Hochzeitsoutfits rechtzeitig bestellen um Lieferzeit und Änderungen zu berücksichtigen.', 'Order wedding outfits early to allow time for delivery and alterations.', 3, 2, true),
  ('styling_outfit_6_2_2', 'styling_outfit', 6, 2, 2, 'beauty_styling', 'Hair & Make-up Artist buchen', 'Book hair and makeup artist', 'Hair und Make-up Dienstleister auswählen und buchen.', 'Select and book hair and makeup artist.', 2, 1, false),
  ('styling_outfit_6_2_3', 'styling_outfit', 6, 2, 3, 'rings', 'Trauringe auswählen und bestellen', 'Select and order rings', 'Trauringe auswählen und Bestellung auslösen.', 'Select and order wedding rings.', 2, 1, false),
  ('styling_outfit_6_2_4', 'styling_outfit', 6, 2, 4, 'outfits_accessories', 'Accessoires auswählen', 'Choose accessories', 'Schmuck Schuhe und weitere Accessoires auswählen.', 'Choose jewelry shoes and other accessories.', 1, 0.5, false),
  ('styling_outfit_6_3_1', 'styling_outfit', 6, 3, 1, 'outfits_accessories', 'Kleid- und Outfitanpassungen durchführen', 'Complete outfit alterations', 'Änderungen an Brautkleid oder Anzug durchführen lassen.', 'Carry out final alterations for wedding outfits.', 1, 0.5, true),
  ('styling_outfit_6_3_2', 'styling_outfit', 6, 3, 2, 'beauty_styling', 'Probestyling durchführen', 'Complete hair and makeup trial', 'Hair und Make-up Probetermin durchführen.', 'Conduct the hair and makeup trial session.', 1, 0.5, false),
  ('styling_outfit_6_3_3', 'styling_outfit', 6, 3, 3, 'beauty_styling', 'Zeitplan für Getting Ready abstimmen', 'Confirm getting ready schedule', 'Zeitplan für Hair und Make-up am Hochzeitstag festlegen.', 'Confirm the getting ready schedule for the wedding day.', 0.5, 0.5, false),
  ('styling_outfit_6_3_4', 'styling_outfit', 6, 3, 4, 'rings', 'Ringe prüfen und abholen', 'Check and collect rings', 'Trauringe prüfen und rechtzeitig abholen.', 'Check and collect the wedding rings.', 0.5, 0.5, false);