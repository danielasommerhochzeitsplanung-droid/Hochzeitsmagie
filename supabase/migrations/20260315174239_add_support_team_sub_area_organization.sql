/*
  # Add Support Team Sub-Area to Organization & Closure Module

  ## Overview
  This migration adds a new sub-area "support_team" (Helfer & Supportteam / Support Team) to the organization_closure category.
  The sub-area covers organizing and coordinating helpers for the wedding day.

  ## Structure
  - **Category**: organization_closure
  - **Sub-Area**: support_team
  - **Label DE**: Helfer & Supportteam
  - **Label EN**: Support Team
  - **Icon**: 💪
  - **Planning Durations**: 30, 24, 18, 15, 12, 9, 6 months
  - **Total Tasks**: 49 (7 tasks × 7 planning durations)

  ## Phase Structure
  1. **Phase 1 - Unterstützung planen** (Plan support)
     - Define support needs for wedding day
     - Identify helper tasks
  
  2. **Phase 2 - Helfer organisieren** (Organize helpers)
     - Ask potential helpers
     - Assign tasks to helpers
     - Plan responsibilities and flow
  
  3. **Phase 3 - Koordination & Abstimmung** (Coordination & Alignment)
     - Create helper task overview
     - Brief helpers before wedding

  ## Task Details
  - All tasks are bilingual (DE/EN)
  - All tasks are non-critical (is_critical = false)
  - Tasks include proper offset and completion timing
  - ID format: organization_closure_support_team_[duration]_[phase]_[order]
*/

-- Insert task templates for support_team sub-area

-- 30 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('organization_closure_support_team_30_1_1', 'organization_closure', 'support_team', 30, 1, 1, 'Unterstützungsbedarf für den Hochzeitstag klären', 'Define support needs for wedding day', 10, 8, false),
('organization_closure_support_team_30_1_2', 'organization_closure', 'support_team', 30, 1, 2, 'Mögliche Aufgaben für Helfer sammeln', 'Identify helper tasks', 9, 7, false),
('organization_closure_support_team_30_2_1', 'organization_closure', 'support_team', 30, 2, 1, 'Geeignete Helfer aus dem Umfeld ansprechen', 'Ask potential helpers', 7, 6, false),
('organization_closure_support_team_30_2_2', 'organization_closure', 'support_team', 30, 2, 2, 'Aufgaben im Supportteam verteilen', 'Assign tasks to helpers', 6, 5, false),
('organization_closure_support_team_30_2_3', 'organization_closure', 'support_team', 30, 2, 3, 'Ablauf und Zuständigkeiten planen', 'Plan responsibilities and flow', 5, 4, false),
('organization_closure_support_team_30_3_1', 'organization_closure', 'support_team', 30, 3, 1, 'Aufgabenübersicht für Helfer erstellen', 'Create helper task overview', 2, 1, false),
('organization_closure_support_team_30_3_2', 'organization_closure', 'support_team', 30, 3, 2, 'Helferbriefing vor der Hochzeit durchführen', 'Brief helpers before wedding', 1, 0.5, false);

-- 24 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('organization_closure_support_team_24_1_1', 'organization_closure', 'support_team', 24, 1, 1, 'Unterstützungsbedarf für den Hochzeitstag klären', 'Define support needs for wedding day', 8, 6, false),
('organization_closure_support_team_24_1_2', 'organization_closure', 'support_team', 24, 1, 2, 'Mögliche Aufgaben für Helfer sammeln', 'Identify helper tasks', 7, 5, false),
('organization_closure_support_team_24_2_1', 'organization_closure', 'support_team', 24, 2, 1, 'Geeignete Helfer aus dem Umfeld ansprechen', 'Ask potential helpers', 5, 4, false),
('organization_closure_support_team_24_2_2', 'organization_closure', 'support_team', 24, 2, 2, 'Aufgaben im Supportteam verteilen', 'Assign tasks to helpers', 4, 3, false),
('organization_closure_support_team_24_2_3', 'organization_closure', 'support_team', 24, 2, 3, 'Ablauf und Zuständigkeiten planen', 'Plan responsibilities and flow', 3, 2, false),
('organization_closure_support_team_24_3_1', 'organization_closure', 'support_team', 24, 3, 1, 'Aufgabenübersicht für Helfer erstellen', 'Create helper task overview', 2, 1, false),
('organization_closure_support_team_24_3_2', 'organization_closure', 'support_team', 24, 3, 2, 'Helferbriefing vor der Hochzeit durchführen', 'Brief helpers before wedding', 1, 0.5, false);

-- 18 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('organization_closure_support_team_18_1_1', 'organization_closure', 'support_team', 18, 1, 1, 'Unterstützungsbedarf für den Hochzeitstag klären', 'Define support needs for wedding day', 7, 5, false),
('organization_closure_support_team_18_1_2', 'organization_closure', 'support_team', 18, 1, 2, 'Mögliche Aufgaben für Helfer sammeln', 'Identify helper tasks', 6, 4, false),
('organization_closure_support_team_18_2_1', 'organization_closure', 'support_team', 18, 2, 1, 'Geeignete Helfer aus dem Umfeld ansprechen', 'Ask potential helpers', 4, 3, false),
('organization_closure_support_team_18_2_2', 'organization_closure', 'support_team', 18, 2, 2, 'Aufgaben im Supportteam verteilen', 'Assign tasks to helpers', 3, 2, false),
('organization_closure_support_team_18_2_3', 'organization_closure', 'support_team', 18, 2, 3, 'Ablauf und Zuständigkeiten planen', 'Plan responsibilities and flow', 2, 1.5, false),
('organization_closure_support_team_18_3_1', 'organization_closure', 'support_team', 18, 3, 1, 'Aufgabenübersicht für Helfer erstellen', 'Create helper task overview', 1.5, 1, false),
('organization_closure_support_team_18_3_2', 'organization_closure', 'support_team', 18, 3, 2, 'Helferbriefing vor der Hochzeit durchführen', 'Brief helpers before wedding', 1, 0.5, false);

-- 15 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('organization_closure_support_team_15_1_1', 'organization_closure', 'support_team', 15, 1, 1, 'Unterstützungsbedarf für den Hochzeitstag klären', 'Define support needs for wedding day', 6, 4, false),
('organization_closure_support_team_15_1_2', 'organization_closure', 'support_team', 15, 1, 2, 'Mögliche Aufgaben für Helfer sammeln', 'Identify helper tasks', 5, 3, false),
('organization_closure_support_team_15_2_1', 'organization_closure', 'support_team', 15, 2, 1, 'Geeignete Helfer aus dem Umfeld ansprechen', 'Ask potential helpers', 3, 2, false),
('organization_closure_support_team_15_2_2', 'organization_closure', 'support_team', 15, 2, 2, 'Aufgaben im Supportteam verteilen', 'Assign tasks to helpers', 2, 1.5, false),
('organization_closure_support_team_15_2_3', 'organization_closure', 'support_team', 15, 2, 3, 'Ablauf und Zuständigkeiten planen', 'Plan responsibilities and flow', 1.5, 1, false),
('organization_closure_support_team_15_3_1', 'organization_closure', 'support_team', 15, 3, 1, 'Aufgabenübersicht für Helfer erstellen', 'Create helper task overview', 1, 0.5, false),
('organization_closure_support_team_15_3_2', 'organization_closure', 'support_team', 15, 3, 2, 'Helferbriefing vor der Hochzeit durchführen', 'Brief helpers before wedding', 0.5, 0.5, false);

-- 12 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('organization_closure_support_team_12_1_1', 'organization_closure', 'support_team', 12, 1, 1, 'Unterstützungsbedarf für den Hochzeitstag klären', 'Define support needs for wedding day', 5, 3, false),
('organization_closure_support_team_12_1_2', 'organization_closure', 'support_team', 12, 1, 2, 'Mögliche Aufgaben für Helfer sammeln', 'Identify helper tasks', 4, 2, false),
('organization_closure_support_team_12_2_1', 'organization_closure', 'support_team', 12, 2, 1, 'Geeignete Helfer aus dem Umfeld ansprechen', 'Ask potential helpers', 2, 1.5, false),
('organization_closure_support_team_12_2_2', 'organization_closure', 'support_team', 12, 2, 2, 'Aufgaben im Supportteam verteilen', 'Assign tasks to helpers', 1.5, 1, false),
('organization_closure_support_team_12_2_3', 'organization_closure', 'support_team', 12, 2, 3, 'Ablauf und Zuständigkeiten planen', 'Plan responsibilities and flow', 1, 0.5, false),
('organization_closure_support_team_12_3_1', 'organization_closure', 'support_team', 12, 3, 1, 'Aufgabenübersicht für Helfer erstellen', 'Create helper task overview', 0.5, 0.5, false),
('organization_closure_support_team_12_3_2', 'organization_closure', 'support_team', 12, 3, 2, 'Helferbriefing vor der Hochzeit durchführen', 'Brief helpers before wedding', 0.5, 0.5, false);

-- 9 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('organization_closure_support_team_9_1_1', 'organization_closure', 'support_team', 9, 1, 1, 'Unterstützungsbedarf für den Hochzeitstag klären', 'Define support needs for wedding day', 4, 3, false),
('organization_closure_support_team_9_1_2', 'organization_closure', 'support_team', 9, 1, 2, 'Mögliche Aufgaben für Helfer sammeln', 'Identify helper tasks', 3, 2, false),
('organization_closure_support_team_9_2_1', 'organization_closure', 'support_team', 9, 2, 1, 'Geeignete Helfer aus dem Umfeld ansprechen', 'Ask potential helpers', 2, 1.5, false),
('organization_closure_support_team_9_2_2', 'organization_closure', 'support_team', 9, 2, 2, 'Aufgaben im Supportteam verteilen', 'Assign tasks to helpers', 1.5, 1, false),
('organization_closure_support_team_9_2_3', 'organization_closure', 'support_team', 9, 2, 3, 'Ablauf und Zuständigkeiten planen', 'Plan responsibilities and flow', 1, 0.5, false),
('organization_closure_support_team_9_3_1', 'organization_closure', 'support_team', 9, 3, 1, 'Aufgabenübersicht für Helfer erstellen', 'Create helper task overview', 0.5, 0.5, false),
('organization_closure_support_team_9_3_2', 'organization_closure', 'support_team', 9, 3, 2, 'Helferbriefing vor der Hochzeit durchführen', 'Brief helpers before wedding', 0.5, 0.5, false);

-- 6 months planning duration
INSERT INTO task_templates (id, category, sub_area, planning_duration_months, phase, order_in_phase, title_de, title_en, recommended_offset_months, latest_completion_months, is_critical) VALUES
('organization_closure_support_team_6_1_1', 'organization_closure', 'support_team', 6, 1, 1, 'Unterstützungsbedarf für den Hochzeitstag klären', 'Define support needs for wedding day', 3, 2, false),
('organization_closure_support_team_6_1_2', 'organization_closure', 'support_team', 6, 1, 2, 'Mögliche Aufgaben für Helfer sammeln', 'Identify helper tasks', 2, 1.5, false),
('organization_closure_support_team_6_2_1', 'organization_closure', 'support_team', 6, 2, 1, 'Geeignete Helfer aus dem Umfeld ansprechen', 'Ask potential helpers', 1.5, 1, false),
('organization_closure_support_team_6_2_2', 'organization_closure', 'support_team', 6, 2, 2, 'Aufgaben im Supportteam verteilen', 'Assign tasks to helpers', 1, 0.5, false),
('organization_closure_support_team_6_2_3', 'organization_closure', 'support_team', 6, 2, 3, 'Ablauf und Zuständigkeiten planen', 'Plan responsibilities and flow', 0.5, 0.5, false),
('organization_closure_support_team_6_3_1', 'organization_closure', 'support_team', 6, 3, 1, 'Aufgabenübersicht für Helfer erstellen', 'Create helper task overview', 0.5, 0.5, false),
('organization_closure_support_team_6_3_2', 'organization_closure', 'support_team', 6, 3, 2, 'Helferbriefing vor der Hochzeit durchführen', 'Brief helpers before wedding', 0.5, 0.5, false);