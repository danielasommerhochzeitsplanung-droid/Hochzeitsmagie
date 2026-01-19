import { z } from 'zod';

const BaseEntitySchema = z.object({
  id: z.string().min(1),
  created_at: z.string().optional(),
});

const DietaryRestrictionSchema = z.object({
  name: z.string(),
  is_vegetarian: z.boolean().default(false),
  is_vegan: z.boolean().default(false),
  is_lactose_intolerant: z.boolean().default(false),
  is_gluten_intolerant: z.boolean().default(false),
  is_halal: z.boolean().default(false),
  has_allergies: z.boolean().default(false),
  allergies: z.string().default(''),
  allergy_nuts: z.boolean().default(false),
  allergy_peanuts: z.boolean().default(false),
  allergy_eggs: z.boolean().default(false),
  allergy_fish: z.boolean().default(false),
  allergy_shellfish: z.boolean().default(false),
  allergy_soy: z.boolean().default(false),
  allergy_sesame: z.boolean().default(false),
});

const GuestSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  partner_name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  number_of_adults: z.number().int().min(0).default(1),
  rsvp_status: z.string().default('pending'),
  attendance_status: z.string().default('unknown'),
  notes: z.string().optional(),
  dietary_restrictions: z.array(DietaryRestrictionSchema).default([]),
  peanut_allergy: z.boolean().default(false),
  tree_nut_allergy: z.boolean().default(false),
  gluten_intolerance: z.boolean().default(false),
  lactose_intolerance: z.boolean().default(false),
  halal: z.boolean().default(false),
  contact_address: z.string().optional(),
  relationship_category: z.string().optional(),
  relationship_side: z.string().optional(),
  relationship_detail: z.string().optional(),
  support_team_role: z.string().optional(),
  gift_received: z.boolean().default(false),
  gift_description: z.string().optional(),
  thank_you_sent: z.boolean().default(false),
  family_name: z.string().optional(),
  is_child: z.boolean().default(false),
  parent_guest_id: z.string().optional(),
  child_age: z.number().int().optional(),
  seated_with_parents: z.boolean().default(true),
  table_id: z.string().optional(),
  archived: z.boolean().default(false),
});

const EventSchema = BaseEntitySchema.extend({
  title: z.string().min(1),
  date: z.string().min(1),
  time: z.string().optional(),
  location_id: z.string().optional(),
  description: z.string().optional(),
  dress_code: z.string().optional(),
  accommodation_info: z.string().optional(),
  transport_needed: z.boolean().default(false),
  transport_time: z.string().optional(),
  transport_departure_location: z.string().optional(),
});

const VendorSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  category: z.string().default('other'),
  email: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  cost: z.number().optional(),
  status: z.string().default('contacted'),
  notes: z.string().optional(),
  contract_signed: z.boolean().default(false),
  deposit_paid: z.boolean().default(false),
  final_payment_due: z.string().optional(),
  archived: z.boolean().default(false),
});

const LocationSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  address: z.string().default(''),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  capacity: z.number().int().optional(),
  notes: z.string().optional(),
  archived: z.boolean().default(false),
});

const SupportTeamSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  role: z.string().default('helper'),
  email: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  archived: z.boolean().default(false),
  guest_id: z.string().optional(),
});

const BudgetItemSchema = BaseEntitySchema.extend({
  category: z.string().default('other'),
  item_name: z.string().optional(),
  estimated_cost: z.number().default(0),
  actual_cost: z.number().optional(),
  paid: z.boolean().default(false),
  notes: z.string().optional(),
  vendor_id: z.string().optional(),
  sync_with_vendor: z.boolean().default(false),
});

const TableSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  capacity: z.number().int().min(1).default(8),
  shape: z.string().optional(),
  table_number: z.number().int().optional(),
  event_id: z.string().optional(),
});

const ProgramItemSchema = BaseEntitySchema.extend({
  title: z.string().min(1),
  description: z.string().optional(),
  start_time: z.string().optional(),
  duration_minutes: z.number().int().optional(),
  event_id: z.string().optional(),
  order_index: z.number().int().default(0),
  support_team_ids: z.array(z.string()).default([]),
  location: z.string().optional(),
  notes: z.string().optional(),
});

const LocationContactSchema = BaseEntitySchema.extend({
  location_id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  is_primary: z.boolean().default(false),
});

const VendorContactSchema = BaseEntitySchema.extend({
  vendor_id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  is_primary: z.boolean().default(false),
  event_day_contact: z.boolean().default(false),
  participates_in_events: z.array(z.string()).default([]),
});

const SupportTeamEventAssignmentSchema = BaseEntitySchema.extend({
  support_team_id: z.string().min(1),
  event_id: z.string().min(1),
  notes: z.string().optional(),
});

const GuestTableAssignmentSchema = BaseEntitySchema.extend({
  guest_id: z.string().min(1),
  table_id: z.string().min(1),
  event_id: z.string().optional(),
});

const WeddingDataSchema = BaseEntitySchema.extend({
  couple_name_1: z.string().optional(),
  couple_name_2: z.string().optional(),
  wedding_date: z.string().optional(),
  planning_start_date: z.string().optional(),
  venue: z.string().optional(),
  total_budget: z.number().optional(),
  auto_tasks_enabled: z.boolean().default(false),
  last_planning_start_date: z.string().optional(),
  last_wedding_date: z.string().optional(),
  auto_tasks_initialized: z.boolean().default(false),
});

const TaskSchema = BaseEntitySchema.extend({
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().default('general'),
  start_date: z.string().optional(),
  due_date: z.string().optional(),
  completed: z.boolean().default(false),
  completed_at: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
  depends_on: z.array(z.string()).default([]),
  assigned_to: z.string().optional(),
  notes: z.string().optional(),
  is_system_task: z.boolean().default(false),
  template_id: z.string().optional(),
  offset_weeks: z.number().optional(),
  offset_type: z.string().optional(),
  needs_adjustment_warning: z.boolean().default(false),
  warning_dismissed: z.boolean().default(false),
  is_system_generated: z.boolean().default(false),
  manually_modified: z.boolean().default(false),
  date_change_notice: z.string().optional(),
});

export const ExportedDataSchema = z.object({
  schemaVersion: z.number().int().min(1).default(1),
  version: z.string().optional(),
  exported: z.string().optional(),
  guests: z.array(GuestSchema).default([]),
  events: z.array(EventSchema).default([]),
  vendors: z.array(VendorSchema).default([]),
  locations: z.array(LocationSchema).default([]),
  support_team: z.array(SupportTeamSchema).default([]),
  budget_items: z.array(BudgetItemSchema).default([]),
  tables: z.array(TableSchema).default([]),
  program_items: z.array(ProgramItemSchema).default([]),
  location_contacts: z.array(LocationContactSchema).default([]),
  vendor_contacts: z.array(VendorContactSchema).default([]),
  support_team_event_assignments: z.array(SupportTeamEventAssignmentSchema).default([]),
  guest_table_assignments: z.array(GuestTableAssignmentSchema).default([]),
  wedding_data: z.array(WeddingDataSchema).default([]),
  tasks: z.array(TaskSchema).default([]),
});

export type ValidatedExportedData = z.infer<typeof ExportedDataSchema>;

export function createEmptyWeddingData(): ValidatedExportedData {
  return {
    schemaVersion: 1,
    version: '1.2',
    exported: new Date().toISOString(),
    guests: [],
    events: [],
    vendors: [],
    locations: [],
    support_team: [],
    budget_items: [],
    tables: [],
    program_items: [],
    location_contacts: [],
    vendor_contacts: [],
    support_team_event_assignments: [],
    guest_table_assignments: [],
    wedding_data: [],
    tasks: [],
  };
}

export function countEntities(data: ValidatedExportedData): number {
  return (
    data.guests.length +
    data.events.length +
    data.vendors.length +
    data.locations.length +
    data.support_team.length +
    data.budget_items.length +
    data.tables.length +
    data.program_items.length +
    data.location_contacts.length +
    data.vendor_contacts.length +
    data.support_team_event_assignments.length +
    data.guest_table_assignments.length +
    data.wedding_data.length +
    data.tasks.length
  );
}
