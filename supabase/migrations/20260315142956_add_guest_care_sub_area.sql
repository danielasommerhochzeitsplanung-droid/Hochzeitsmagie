/*
  # Add Guest Care Sub-Area to Vendors & Services Module

  ## Overview
  This migration adds a new sub-area "guest_care" (Gästebetreuung / Guest Care) to the vendors_services category.
  The sub-area covers planning and organizing support for guests during the wedding.

  ## Structure
  - **Category**: vendors_services
  - **Sub-Area**: guest_care
  - **Planning Durations**: 30, 24, 18, 15, 12, 9, 6 months
  - **Total Tasks**: 49 (7 tasks × 7 planning durations)

  ## Phase Structure
  1. **Phase 1 - Bedürfnisse verstehen** (Understand needs)
     - Understand guest needs
     - Plan guest support concept
  
  2. **Phase 2 - Organisation** (Organization)
     - Research suitable providers
     - Arrange guest support
     - Plan support schedule
  
  3. **Phase 3 - Vorbereitung & Abstimmung** (Preparation & Coordination)
     - Prepare guest and children areas
     - Confirm support arrangements

  ## Task Details
  - All tasks are bilingual (DE/EN)
  - All tasks are non-critical (is_critical = false)
  - Tasks include proper offset and completion timing
  - ID format: vendors_services_guest_care_[duration]_[phase]_[order]
*/

-- Insert task templates for guest_care sub-area

-- 30 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('vendors_services_guest_care_30_1_1', 'vendors_services', 'guest_care', 30, 1, 1, 'Bedürfnisse der Gäste erfassen', 'Understand guest needs', 12, 10, false),
('vendors_services_guest_care_30_1_2', 'vendors_services', 'guest_care', 30, 1, 2, 'Unterstützungsangebot planen', 'Plan guest support concept', 11, 9, false),
('vendors_services_guest_care_30_2_1', 'vendors_services', 'guest_care', 30, 2, 1, 'Passende Anbieter recherchieren', 'Research suitable providers', 9, 7, false),
('vendors_services_guest_care_30_2_2', 'vendors_services', 'guest_care', 30, 2, 2, 'Unterstützung organisieren', 'Arrange guest support', 7, 6, false),
('vendors_services_guest_care_30_2_3', 'vendors_services', 'guest_care', 30, 2, 3, 'Zeiten und Ablauf planen', 'Plan support schedule', 6, 5, false),
('vendors_services_guest_care_30_3_1', 'vendors_services', 'guest_care', 30, 3, 1, 'Bereiche für Kinder und Gäste vorbereiten', 'Prepare guest and children areas', 2, 1, false),
('vendors_services_guest_care_30_3_2', 'vendors_services', 'guest_care', 30, 3, 2, 'Organisation final abstimmen', 'Confirm support arrangements', 1, 0.5, false);

-- 24 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('vendors_services_guest_care_24_1_1', 'vendors_services', 'guest_care', 24, 1, 1, 'Bedürfnisse der Gäste erfassen', 'Understand guest needs', 10, 8, false),
('vendors_services_guest_care_24_1_2', 'vendors_services', 'guest_care', 24, 1, 2, 'Unterstützungsangebot planen', 'Plan guest support concept', 9, 7, false),
('vendors_services_guest_care_24_2_1', 'vendors_services', 'guest_care', 24, 2, 1, 'Passende Anbieter recherchieren', 'Research suitable providers', 7, 5, false),
('vendors_services_guest_care_24_2_2', 'vendors_services', 'guest_care', 24, 2, 2, 'Unterstützung organisieren', 'Arrange guest support', 5, 4, false),
('vendors_services_guest_care_24_2_3', 'vendors_services', 'guest_care', 24, 2, 3, 'Zeiten und Ablauf planen', 'Plan support schedule', 4, 3, false),
('vendors_services_guest_care_24_3_1', 'vendors_services', 'guest_care', 24, 3, 1, 'Bereiche für Kinder und Gäste vorbereiten', 'Prepare guest and children areas', 2, 1, false),
('vendors_services_guest_care_24_3_2', 'vendors_services', 'guest_care', 24, 3, 2, 'Organisation final abstimmen', 'Confirm support arrangements', 1, 0.5, false);

-- 18 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('vendors_services_guest_care_18_1_1', 'vendors_services', 'guest_care', 18, 1, 1, 'Bedürfnisse der Gäste erfassen', 'Understand guest needs', 8, 6, false),
('vendors_services_guest_care_18_1_2', 'vendors_services', 'guest_care', 18, 1, 2, 'Unterstützungsangebot planen', 'Plan guest support concept', 7, 5, false),
('vendors_services_guest_care_18_2_1', 'vendors_services', 'guest_care', 18, 2, 1, 'Passende Anbieter recherchieren', 'Research suitable providers', 5, 4, false),
('vendors_services_guest_care_18_2_2', 'vendors_services', 'guest_care', 18, 2, 2, 'Unterstützung organisieren', 'Arrange guest support', 4, 3, false),
('vendors_services_guest_care_18_2_3', 'vendors_services', 'guest_care', 18, 2, 3, 'Zeiten und Ablauf planen', 'Plan support schedule', 3, 2, false),
('vendors_services_guest_care_18_3_1', 'vendors_services', 'guest_care', 18, 3, 1, 'Bereiche für Kinder und Gäste vorbereiten', 'Prepare guest and children areas', 2, 1, false),
('vendors_services_guest_care_18_3_2', 'vendors_services', 'guest_care', 18, 3, 2, 'Organisation final abstimmen', 'Confirm support arrangements', 1, 0.5, false);

-- 15 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('vendors_services_guest_care_15_1_1', 'vendors_services', 'guest_care', 15, 1, 1, 'Bedürfnisse der Gäste erfassen', 'Understand guest needs', 6, 5, false),
('vendors_services_guest_care_15_1_2', 'vendors_services', 'guest_care', 15, 1, 2, 'Unterstützungsangebot planen', 'Plan guest support concept', 5, 4, false),
('vendors_services_guest_care_15_2_1', 'vendors_services', 'guest_care', 15, 2, 1, 'Passende Anbieter recherchieren', 'Research suitable providers', 4, 3, false),
('vendors_services_guest_care_15_2_2', 'vendors_services', 'guest_care', 15, 2, 2, 'Unterstützung organisieren', 'Arrange guest support', 3, 2, false),
('vendors_services_guest_care_15_2_3', 'vendors_services', 'guest_care', 15, 2, 3, 'Zeiten und Ablauf planen', 'Plan support schedule', 2, 1.5, false),
('vendors_services_guest_care_15_3_1', 'vendors_services', 'guest_care', 15, 3, 1, 'Bereiche für Kinder und Gäste vorbereiten', 'Prepare guest and children areas', 1, 0.5, false),
('vendors_services_guest_care_15_3_2', 'vendors_services', 'guest_care', 15, 3, 2, 'Organisation final abstimmen', 'Confirm support arrangements', 0.5, 0.5, false);

-- 12 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('vendors_services_guest_care_12_1_1', 'vendors_services', 'guest_care', 12, 1, 1, 'Bedürfnisse der Gäste erfassen', 'Understand guest needs', 5, 4, false),
('vendors_services_guest_care_12_1_2', 'vendors_services', 'guest_care', 12, 1, 2, 'Unterstützungsangebot planen', 'Plan guest support concept', 4, 3, false),
('vendors_services_guest_care_12_2_1', 'vendors_services', 'guest_care', 12, 2, 1, 'Passende Anbieter recherchieren', 'Research suitable providers', 3, 2, false),
('vendors_services_guest_care_12_2_2', 'vendors_services', 'guest_care', 12, 2, 2, 'Unterstützung organisieren', 'Arrange guest support', 2, 1.5, false),
('vendors_services_guest_care_12_2_3', 'vendors_services', 'guest_care', 12, 2, 3, 'Zeiten und Ablauf planen', 'Plan support schedule', 1.5, 1, false),
('vendors_services_guest_care_12_3_1', 'vendors_services', 'guest_care', 12, 3, 1, 'Bereiche für Kinder und Gäste vorbereiten', 'Prepare guest and children areas', 1, 0.5, false),
('vendors_services_guest_care_12_3_2', 'vendors_services', 'guest_care', 12, 3, 2, 'Organisation final abstimmen', 'Confirm support arrangements', 0.5, 0.5, false);

-- 9 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('vendors_services_guest_care_9_1_1', 'vendors_services', 'guest_care', 9, 1, 1, 'Bedürfnisse der Gäste erfassen', 'Understand guest needs', 4, 3, false),
('vendors_services_guest_care_9_1_2', 'vendors_services', 'guest_care', 9, 1, 2, 'Unterstützungsangebot planen', 'Plan guest support concept', 3, 2, false),
('vendors_services_guest_care_9_2_1', 'vendors_services', 'guest_care', 9, 2, 1, 'Passende Anbieter recherchieren', 'Research suitable providers', 2, 1.5, false),
('vendors_services_guest_care_9_2_2', 'vendors_services', 'guest_care', 9, 2, 2, 'Unterstützung organisieren', 'Arrange guest support', 1.5, 1, false),
('vendors_services_guest_care_9_2_3', 'vendors_services', 'guest_care', 9, 2, 3, 'Zeiten und Ablauf planen', 'Plan support schedule', 1, 0.5, false),
('vendors_services_guest_care_9_3_1', 'vendors_services', 'guest_care', 9, 3, 1, 'Bereiche für Kinder und Gäste vorbereiten', 'Prepare guest and children areas', 0.5, 0.5, false),
('vendors_services_guest_care_9_3_2', 'vendors_services', 'guest_care', 9, 3, 2, 'Organisation final abstimmen', 'Confirm support arrangements', 0.5, 0.5, false);

-- 6 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('vendors_services_guest_care_6_1_1', 'vendors_services', 'guest_care', 6, 1, 1, 'Bedürfnisse der Gäste erfassen', 'Understand guest needs', 3, 2, false),
('vendors_services_guest_care_6_1_2', 'vendors_services', 'guest_care', 6, 1, 2, 'Unterstützungsangebot planen', 'Plan guest support concept', 2, 1.5, false),
('vendors_services_guest_care_6_2_1', 'vendors_services', 'guest_care', 6, 2, 1, 'Passende Anbieter recherchieren', 'Research suitable providers', 1.5, 1, false),
('vendors_services_guest_care_6_2_2', 'vendors_services', 'guest_care', 6, 2, 2, 'Unterstützung organisieren', 'Arrange guest support', 1, 0.5, false),
('vendors_services_guest_care_6_2_3', 'vendors_services', 'guest_care', 6, 2, 3, 'Zeiten und Ablauf planen', 'Plan support schedule', 0.5, 0.5, false),
('vendors_services_guest_care_6_3_1', 'vendors_services', 'guest_care', 6, 3, 1, 'Bereiche für Kinder und Gäste vorbereiten', 'Prepare guest and children areas', 0.5, 0.5, false),
('vendors_services_guest_care_6_3_2', 'vendors_services', 'guest_care', 6, 3, 2, 'Organisation final abstimmen', 'Confirm support arrangements', 0.5, 0.5, false);