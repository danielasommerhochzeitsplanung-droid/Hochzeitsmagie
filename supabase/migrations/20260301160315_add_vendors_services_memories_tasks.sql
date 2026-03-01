/*
  # Add Memories (Photo & Video) Tasks to Vendors & Services Category

  1. New Tasks
    - Adds 56 tasks for category 'vendors_services' (memories: photo & video)
    - Covers 7 planning durations: 30, 24, 18, 15, 12, 9, 6 months
    - 3 phases per duration (phase 1, 2, 3)
    - 8 tasks per planning duration
    
  2. Task Breakdown
    **Phase 1 - Planning & Research (4 tasks)**
    - Define memory formats (photo, video, photo booth, guest photos)
    - Define photo and video style and scope
    - Plan budget for memories (critical)
    - Research and compare providers (critical)
    
    **Phase 2 - Booking & Coordination (3 tasks)**
    - Book primary photo and video provider (critical)
    - Align timeline and shot requests
    - Plan guest photo setup
    
    **Phase 3 - Final Coordination (1 task)**
    - Obtain final alignment and confirmation (critical)
    
  3. Critical Tasks
    - Budget planning
    - Provider research and comparison
    - Booking primary provider
    - Final alignment and confirmation
    
  4. Notes
    - All tasks use category 'vendors_services'
    - No dependencies stored (order defined by phase and order_in_phase)
    - Offsets define timing relative to wedding date
    - IDs are auto-generated using gen_random_uuid()
*/

-- Insert tasks for 30 months planning duration
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
(gen_random_uuid(), 'vendors_services', 30, 1, 1, 'Erinnerungsformate festlegen', 'Define memory formats', 'Festlegen, ob Foto, Video, Fotobox und Gästefotos gewünscht sind.', 'Decide whether photo, video, a photo booth and guest photos are desired.', 30, 28, false),
(gen_random_uuid(), 'vendors_services', 30, 1, 2, 'Stil und Umfang für Foto und Video festlegen', 'Define photo and video style and scope', 'Stilrichtung und Umfang für Foto und Video festlegen.', 'Define the style direction and scope for photo and video.', 29, 27, false),
(gen_random_uuid(), 'vendors_services', 30, 1, 3, 'Budget für Erinnerungen planen', 'Plan budget for memories', 'Budgetrahmen für Foto, Video und Zusatzformate festlegen.', 'Set the budget range for photo, video and add-ons.', 28, 26, true),
(gen_random_uuid(), 'vendors_services', 30, 1, 4, 'Anbieter für Foto und Video recherchieren und vergleichen', 'Research and compare photo and video providers', 'Anbieter recherchieren und Angebote vergleichbar machen.', 'Research providers and make offers comparable.', 27, 25, true),
(gen_random_uuid(), 'vendors_services', 30, 2, 1, 'Hauptanbieter für Foto und Video beauftragen', 'Book primary photo and video provider', 'Hauptanbieter verbindlich beauftragen und Eckdaten dokumentieren.', 'Book the primary provider and document key details.', 24, 20, true),
(gen_random_uuid(), 'vendors_services', 30, 2, 2, 'Ablauf und Motivwünsche abstimmen', 'Align timeline and shot requests', 'Abstimmung zu Zeitplan, Motivwünschen und Übergaben.', 'Align on timeline, shot requests and handovers.', 6, 2, false),
(gen_random_uuid(), 'vendors_services', 30, 2, 3, 'Setup für Gästefotos planen', 'Plan guest photo setup', 'Cloud, QR-Code oder Upload-Prozess für Gästefotos festlegen.', 'Define cloud, QR or upload process for guest photos.', 3, 1, false),
(gen_random_uuid(), 'vendors_services', 30, 3, 1, 'Finale Abstimmung und Bestätigung einholen', 'Obtain final alignment and confirmation', 'Finale Zeiten, Ansprechpartner und Übergaben bestätigen.', 'Confirm final timings, contacts and handovers.', 1, 0.5, true);

-- Insert tasks for 24 months planning duration
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
(gen_random_uuid(), 'vendors_services', 24, 1, 1, 'Erinnerungsformate festlegen', 'Define memory formats', 'Festlegen, ob Foto, Video, Fotobox und Gästefotos gewünscht sind.', 'Decide whether photo, video, a photo booth and guest photos are desired.', 24, 22, false),
(gen_random_uuid(), 'vendors_services', 24, 1, 2, 'Stil und Umfang für Foto und Video festlegen', 'Define photo and video style and scope', 'Stilrichtung und Umfang für Foto und Video festlegen.', 'Define the style direction and scope for photo and video.', 23, 21, false),
(gen_random_uuid(), 'vendors_services', 24, 1, 3, 'Budget für Erinnerungen planen', 'Plan budget for memories', 'Budgetrahmen für Foto, Video und Zusatzformate festlegen.', 'Set the budget range for photo, video and add-ons.', 22, 20, true),
(gen_random_uuid(), 'vendors_services', 24, 1, 4, 'Anbieter für Foto und Video recherchieren und vergleichen', 'Research and compare photo and video providers', 'Anbieter recherchieren und Angebote vergleichbar machen.', 'Research providers and make offers comparable.', 21, 19, true),
(gen_random_uuid(), 'vendors_services', 24, 2, 1, 'Hauptanbieter für Foto und Video beauftragen', 'Book primary photo and video provider', 'Hauptanbieter verbindlich beauftragen und Eckdaten dokumentieren.', 'Book the primary provider and document key details.', 18, 15, true),
(gen_random_uuid(), 'vendors_services', 24, 2, 2, 'Ablauf und Motivwünsche abstimmen', 'Align timeline and shot requests', 'Abstimmung zu Zeitplan, Motivwünschen und Übergaben.', 'Align on timeline, shot requests and handovers.', 5, 2, false),
(gen_random_uuid(), 'vendors_services', 24, 2, 3, 'Setup für Gästefotos planen', 'Plan guest photo setup', 'Cloud, QR-Code oder Upload-Prozess für Gästefotos festlegen.', 'Define cloud, QR or upload process for guest photos.', 3, 1, false),
(gen_random_uuid(), 'vendors_services', 24, 3, 1, 'Finale Abstimmung und Bestätigung einholen', 'Obtain final alignment and confirmation', 'Finale Zeiten, Ansprechpartner und Übergaben bestätigen.', 'Confirm final timings, contacts and handovers.', 1, 0.5, true);

-- Insert tasks for 18 months planning duration
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
(gen_random_uuid(), 'vendors_services', 18, 1, 1, 'Erinnerungsformate festlegen', 'Define memory formats', 'Festlegen, ob Foto, Video, Fotobox und Gästefotos gewünscht sind.', 'Decide whether photo, video, a photo booth and guest photos are desired.', 18, 16, false),
(gen_random_uuid(), 'vendors_services', 18, 1, 2, 'Stil und Umfang für Foto und Video festlegen', 'Define photo and video style and scope', 'Stilrichtung und Umfang für Foto und Video festlegen.', 'Define the style direction and scope for photo and video.', 17, 15, false),
(gen_random_uuid(), 'vendors_services', 18, 1, 3, 'Budget für Erinnerungen planen', 'Plan budget for memories', 'Budgetrahmen für Foto, Video und Zusatzformate festlegen.', 'Set the budget range for photo, video and add-ons.', 16, 14, true),
(gen_random_uuid(), 'vendors_services', 18, 1, 4, 'Anbieter für Foto und Video recherchieren und vergleichen', 'Research and compare photo and video providers', 'Anbieter recherchieren und Angebote vergleichbar machen.', 'Research providers and make offers comparable.', 15, 13, true),
(gen_random_uuid(), 'vendors_services', 18, 2, 1, 'Hauptanbieter für Foto und Video beauftragen', 'Book primary photo and video provider', 'Hauptanbieter verbindlich beauftragen und Eckdaten dokumentieren.', 'Book the primary provider and document key details.', 14, 12, true),
(gen_random_uuid(), 'vendors_services', 18, 2, 2, 'Ablauf und Motivwünsche abstimmen', 'Align timeline and shot requests', 'Abstimmung zu Zeitplan, Motivwünschen und Übergaben.', 'Align on timeline, shot requests and handovers.', 4, 2, false),
(gen_random_uuid(), 'vendors_services', 18, 2, 3, 'Setup für Gästefotos planen', 'Plan guest photo setup', 'Cloud, QR-Code oder Upload-Prozess für Gästefotos festlegen.', 'Define cloud, QR or upload process for guest photos.', 3, 1, false),
(gen_random_uuid(), 'vendors_services', 18, 3, 1, 'Finale Abstimmung und Bestätigung einholen', 'Obtain final alignment and confirmation', 'Finale Zeiten, Ansprechpartner und Übergaben bestätigen.', 'Confirm final timings, contacts and handovers.', 1, 0.5, true);

-- Insert tasks for 15 months planning duration
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
(gen_random_uuid(), 'vendors_services', 15, 1, 1, 'Erinnerungsformate festlegen', 'Define memory formats', 'Festlegen, ob Foto, Video, Fotobox und Gästefotos gewünscht sind.', 'Decide whether photo, video, a photo booth and guest photos are desired.', 15, 13, false),
(gen_random_uuid(), 'vendors_services', 15, 1, 2, 'Stil und Umfang für Foto und Video festlegen', 'Define photo and video style and scope', 'Stilrichtung und Umfang für Foto und Video festlegen.', 'Define the style direction and scope for photo and video.', 14, 12, false),
(gen_random_uuid(), 'vendors_services', 15, 1, 3, 'Budget für Erinnerungen planen', 'Plan budget for memories', 'Budgetrahmen für Foto, Video und Zusatzformate festlegen.', 'Set the budget range for photo, video and add-ons.', 13, 11, true),
(gen_random_uuid(), 'vendors_services', 15, 1, 4, 'Anbieter für Foto und Video recherchieren und vergleichen', 'Research and compare photo and video providers', 'Anbieter recherchieren und Angebote vergleichbar machen.', 'Research providers and make offers comparable.', 12, 10, true),
(gen_random_uuid(), 'vendors_services', 15, 2, 1, 'Hauptanbieter für Foto und Video beauftragen', 'Book primary photo and video provider', 'Hauptanbieter verbindlich beauftragen und Eckdaten dokumentieren.', 'Book the primary provider and document key details.', 12, 10, true),
(gen_random_uuid(), 'vendors_services', 15, 2, 2, 'Ablauf und Motivwünsche abstimmen', 'Align timeline and shot requests', 'Abstimmung zu Zeitplan, Motivwünschen und Übergaben.', 'Align on timeline, shot requests and handovers.', 4, 2, false),
(gen_random_uuid(), 'vendors_services', 15, 2, 3, 'Setup für Gästefotos planen', 'Plan guest photo setup', 'Cloud, QR-Code oder Upload-Prozess für Gästefotos festlegen.', 'Define cloud, QR or upload process for guest photos.', 3, 1, false),
(gen_random_uuid(), 'vendors_services', 15, 3, 1, 'Finale Abstimmung und Bestätigung einholen', 'Obtain final alignment and confirmation', 'Finale Zeiten, Ansprechpartner und Übergaben bestätigen.', 'Confirm final timings, contacts and handovers.', 1, 0.5, true);

-- Insert tasks for 12 months planning duration
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
(gen_random_uuid(), 'vendors_services', 12, 1, 1, 'Erinnerungsformate festlegen', 'Define memory formats', 'Festlegen, ob Foto, Video, Fotobox und Gästefotos gewünscht sind.', 'Decide whether photo, video, a photo booth and guest photos are desired.', 12, 10, false),
(gen_random_uuid(), 'vendors_services', 12, 1, 2, 'Stil und Umfang für Foto und Video festlegen', 'Define photo and video style and scope', 'Stilrichtung und Umfang für Foto und Video festlegen.', 'Define the style direction and scope for photo and video.', 11, 9, false),
(gen_random_uuid(), 'vendors_services', 12, 1, 3, 'Budget für Erinnerungen planen', 'Plan budget for memories', 'Budgetrahmen für Foto, Video und Zusatzformate festlegen.', 'Set the budget range for photo, video and add-ons.', 10, 8, true),
(gen_random_uuid(), 'vendors_services', 12, 1, 4, 'Anbieter für Foto und Video recherchieren und vergleichen', 'Research and compare photo and video providers', 'Anbieter recherchieren und Angebote vergleichbar machen.', 'Research providers and make offers comparable.', 9, 7, true),
(gen_random_uuid(), 'vendors_services', 12, 2, 1, 'Hauptanbieter für Foto und Video beauftragen', 'Book primary photo and video provider', 'Hauptanbieter verbindlich beauftragen und Eckdaten dokumentieren.', 'Book the primary provider and document key details.', 9, 7, true),
(gen_random_uuid(), 'vendors_services', 12, 2, 2, 'Ablauf und Motivwünsche abstimmen', 'Align timeline and shot requests', 'Abstimmung zu Zeitplan, Motivwünschen und Übergaben.', 'Align on timeline, shot requests and handovers.', 4, 2, false),
(gen_random_uuid(), 'vendors_services', 12, 2, 3, 'Setup für Gästefotos planen', 'Plan guest photo setup', 'Cloud, QR-Code oder Upload-Prozess für Gästefotos festlegen.', 'Define cloud, QR or upload process for guest photos.', 3, 1, false),
(gen_random_uuid(), 'vendors_services', 12, 3, 1, 'Finale Abstimmung und Bestätigung einholen', 'Obtain final alignment and confirmation', 'Finale Zeiten, Ansprechpartner und Übergaben bestätigen.', 'Confirm final timings, contacts and handovers.', 1, 0.5, true);

-- Insert tasks for 9 months planning duration
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
(gen_random_uuid(), 'vendors_services', 9, 1, 1, 'Erinnerungsformate festlegen', 'Define memory formats', 'Festlegen, ob Foto, Video, Fotobox und Gästefotos gewünscht sind.', 'Decide whether photo, video, a photo booth and guest photos are desired.', 9, 7, false),
(gen_random_uuid(), 'vendors_services', 9, 1, 2, 'Stil und Umfang für Foto und Video festlegen', 'Define photo and video style and scope', 'Stilrichtung und Umfang für Foto und Video festlegen.', 'Define the style direction and scope for photo and video.', 8, 6, false),
(gen_random_uuid(), 'vendors_services', 9, 1, 3, 'Budget für Erinnerungen planen', 'Plan budget for memories', 'Budgetrahmen für Foto, Video und Zusatzformate festlegen.', 'Set the budget range for photo, video and add-ons.', 7, 5, true),
(gen_random_uuid(), 'vendors_services', 9, 1, 4, 'Anbieter für Foto und Video recherchieren und vergleichen', 'Research and compare photo and video providers', 'Anbieter recherchieren und Angebote vergleichbar machen.', 'Research providers and make offers comparable.', 6, 4, true),
(gen_random_uuid(), 'vendors_services', 9, 2, 1, 'Hauptanbieter für Foto und Video beauftragen', 'Book primary photo and video provider', 'Hauptanbieter verbindlich beauftragen und Eckdaten dokumentieren.', 'Book the primary provider and document key details.', 6, 5, true),
(gen_random_uuid(), 'vendors_services', 9, 2, 2, 'Ablauf und Motivwünsche abstimmen', 'Align timeline and shot requests', 'Abstimmung zu Zeitplan, Motivwünschen und Übergaben.', 'Align on timeline, shot requests and handovers.', 3, 2, false),
(gen_random_uuid(), 'vendors_services', 9, 2, 3, 'Setup für Gästefotos planen', 'Plan guest photo setup', 'Cloud, QR-Code oder Upload-Prozess für Gästefotos festlegen.', 'Define cloud, QR or upload process for guest photos.', 2, 1, false),
(gen_random_uuid(), 'vendors_services', 9, 3, 1, 'Finale Abstimmung und Bestätigung einholen', 'Obtain final alignment and confirmation', 'Finale Zeiten, Ansprechpartner und Übergaben bestätigen.', 'Confirm final timings, contacts and handovers.', 1, 0.5, true);

-- Insert tasks for 6 months planning duration
INSERT INTO task_templates (id, category, planning_duration_months, phase, order_in_phase, title_de, title_en, description_de, description_en, recommended_offset_months, latest_completion_months, is_critical)
VALUES
(gen_random_uuid(), 'vendors_services', 6, 1, 1, 'Erinnerungsformate festlegen', 'Define memory formats', 'Festlegen, ob Foto, Video, Fotobox und Gästefotos gewünscht sind.', 'Decide whether photo, video, a photo booth and guest photos are desired.', 6, 5, false),
(gen_random_uuid(), 'vendors_services', 6, 1, 2, 'Stil und Umfang für Foto und Video festlegen', 'Define photo and video style and scope', 'Stilrichtung und Umfang für Foto und Video festlegen.', 'Define the style direction and scope for photo and video.', 5.5, 4.5, false),
(gen_random_uuid(), 'vendors_services', 6, 1, 3, 'Budget für Erinnerungen planen', 'Plan budget for memories', 'Budgetrahmen für Foto, Video und Zusatzformate festlegen.', 'Set the budget range for photo, video and add-ons.', 5, 4, true),
(gen_random_uuid(), 'vendors_services', 6, 1, 4, 'Anbieter für Foto und Video recherchieren und vergleichen', 'Research and compare photo and video providers', 'Anbieter recherchieren und Angebote vergleichbar machen.', 'Research providers and make offers comparable.', 4.5, 3.5, true),
(gen_random_uuid(), 'vendors_services', 6, 2, 1, 'Hauptanbieter für Foto und Video beauftragen', 'Book primary photo and video provider', 'Hauptanbieter verbindlich beauftragen und Eckdaten dokumentieren.', 'Book the primary provider and document key details.', 4.5, 4, true),
(gen_random_uuid(), 'vendors_services', 6, 2, 2, 'Ablauf und Motivwünsche abstimmen', 'Align timeline and shot requests', 'Abstimmung zu Zeitplan, Motivwünschen und Übergaben.', 'Align on timeline, shot requests and handovers.', 2.5, 2, false),
(gen_random_uuid(), 'vendors_services', 6, 2, 3, 'Setup für Gästefotos planen', 'Plan guest photo setup', 'Cloud, QR-Code oder Upload-Prozess für Gästefotos festlegen.', 'Define cloud, QR or upload process for guest photos.', 2, 1, false),
(gen_random_uuid(), 'vendors_services', 6, 3, 1, 'Finale Abstimmung und Bestätigung einholen', 'Obtain final alignment and confirmation', 'Finale Zeiten, Ansprechpartner und Übergaben bestätigen.', 'Confirm final timings, contacts and handovers.', 1, 0.5, true);
