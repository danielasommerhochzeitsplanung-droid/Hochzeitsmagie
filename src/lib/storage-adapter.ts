import { generateId } from './uuid';
import { ExportedDataSchema, createEmptyWeddingData, countEntities, type ValidatedExportedData } from '../schemas/weddingData.schema';

const STORAGE_PREFIX = 'wedding_';
const STORAGE_VERSION = '1.2';
const VERSION_KEY = `${STORAGE_PREFIX}version`;

export interface ImportResult {
  ok: boolean;
  imported: number;
  skipped: number;
  errors: string[];
}

type StorageKey =
  | 'guests'
  | 'events'
  | 'vendors'
  | 'locations'
  | 'support_team'
  | 'budget_items'
  | 'tables'
  | 'program_items'
  | 'location_contacts'
  | 'vendor_contacts'
  | 'support_team_event_assignments'
  | 'guest_table_assignments'
  | 'wedding_data'
  | 'tasks'
  | 'phases';

interface BaseEntity {
  id: string;
  created_at?: string;
}

export class StorageError extends Error {
  constructor(message: string, public readonly code: 'QUOTA_EXCEEDED' | 'PARSE_ERROR' | 'UNKNOWN') {
    super(message);
    this.name = 'StorageError';
  }
}

class LocalStorageAdapter<T extends BaseEntity> {
  constructor(private key: StorageKey) {}

  private getStorageKey(): string {
    return `${STORAGE_PREFIX}${this.key}`;
  }

  private handleStorageError(error: unknown): never {
    if (error instanceof DOMException) {
      if (
        error.name === 'QuotaExceededError' ||
        error.code === 22 ||
        error.code === 1014
      ) {
        throw new StorageError(
          'Speichern nicht möglich. Dein Browser-Speicher ist fast voll. Bitte exportiere deine Daten und lösche dann alte Einträge.',
          'QUOTA_EXCEEDED'
        );
      }
    }
    throw new StorageError('Fehler beim Speichern der Daten', 'UNKNOWN');
  }

  getAll(): T[] {
    try {
      const data = localStorage.getItem(this.getStorageKey());
      if (!data) return [];
      return JSON.parse(data);
    } catch (error) {
      console.error(`Fehler beim Laden von ${this.key}:`, error);
      if (error instanceof SyntaxError) {
        throw new StorageError('Daten konnten nicht gelesen werden', 'PARSE_ERROR');
      }
      return [];
    }
  }

  get(id: string): T | null {
    const items = this.getAll();
    return items.find(item => item.id === id) || null;
  }

  create(data: Omit<T, 'id' | 'created_at'>): T {
    try {
      const items = this.getAll();
      const newItem = {
        ...data,
        id: generateId(),
        created_at: new Date().toISOString(),
      } as T;
      items.push(newItem);
      localStorage.setItem(this.getStorageKey(), JSON.stringify(items));
      return newItem;
    } catch (error) {
      this.handleStorageError(error);
    }
  }

  update(id: string, data: Partial<T>): T | null {
    try {
      const items = this.getAll();
      const index = items.findIndex(item => item.id === id);
      if (index === -1) return null;

      items[index] = { ...items[index], ...data };
      localStorage.setItem(this.getStorageKey(), JSON.stringify(items));
      return items[index];
    } catch (error) {
      this.handleStorageError(error);
    }
  }

  delete(id: string): boolean {
    try {
      const items = this.getAll();
      const filtered = items.filter(item => item.id !== id);
      if (filtered.length === items.length) return false;

      localStorage.setItem(this.getStorageKey(), JSON.stringify(filtered));
      return true;
    } catch (error) {
      this.handleStorageError(error);
    }
  }

  replaceAll(data: T[]): void {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(data));
    } catch (error) {
      this.handleStorageError(error);
    }
  }

  clear(): void {
    localStorage.removeItem(this.getStorageKey());
  }
}

export interface DietaryRestriction {
  name: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_lactose_intolerant: boolean;
  is_gluten_intolerant: boolean;
  is_halal: boolean;
  has_allergies: boolean;
  allergies: string;
  allergy_nuts: boolean;
  allergy_peanuts: boolean;
  allergy_eggs: boolean;
  allergy_fish: boolean;
  allergy_shellfish: boolean;
  allergy_soy: boolean;
  allergy_sesame: boolean;
}

export interface Guest extends BaseEntity {
  name: string;
  partner_name?: string;
  email?: string;
  phone?: string;
  number_of_adults: number;
  rsvp_status: string;
  attendance_status: string;
  notes?: string;
  dietary_restrictions?: DietaryRestriction[];
  peanut_allergy: boolean;
  tree_nut_allergy: boolean;
  gluten_intolerance: boolean;
  lactose_intolerance: boolean;
  halal: boolean;
  contact_address?: string;
  relationship_category?: string;
  relationship_side?: string;
  relationship_detail?: string;
  support_team_role?: string;
  gift_received: boolean;
  gift_description?: string;
  thank_you_sent: boolean;
  family_name?: string;
  is_child: boolean;
  parent_guest_id?: string;
  child_age?: number;
  seated_with_parents: boolean;
  table_id?: string;
  archived: boolean;
}

export interface Event extends BaseEntity {
  title: string;
  date: string;
  time?: string;
  location_id?: string;
  description?: string;
  dress_code?: string;
  accommodation_info?: string;
  transport_needed: boolean;
  transport_time?: string;
  transport_departure_location?: string;
}

export interface Vendor extends BaseEntity {
  name: string;
  category: string;
  email?: string;
  phone?: string;
  website?: string;
  cost?: number;
  status: string;
  notes?: string;
  contract_signed: boolean;
  deposit_paid: boolean;
  final_payment_due?: string;
  first_contact_date?: string;
  next_appointment?: string;
  cancellation_deadline?: string;
  archived: boolean;
}

export interface Location extends BaseEntity {
  name: string;
  address: string;
  city?: string;
  postal_code?: string;
  country?: string;
  email?: string;
  phone?: string;
  website?: string;
  capacity?: number;
  notes?: string;
  viewing_date?: string;
  reservation_date?: string;
  archived: boolean;
}

export interface SupportTeam extends BaseEntity {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  notes?: string;
  briefing_date?: string;
  availability_start?: string;
  availability_end?: string;
  archived: boolean;
  guest_id?: string;
}

export interface BudgetItem extends BaseEntity {
  category: string;
  item_name?: string;
  estimated_cost: number;
  actual_cost?: number;
  paid: boolean;
  notes?: string;
  vendor_id?: string;
  sync_with_vendor: boolean;
}

export interface Table extends BaseEntity {
  name: string;
  capacity: number;
  shape?: string;
  table_number?: number;
  event_id?: string;
}

export interface ProgramItem extends BaseEntity {
  title: string;
  description?: string;
  start_time?: string;
  duration_minutes?: number;
  event_id?: string;
  order_index: number;
  support_team_ids?: string[];
  location?: string;
  notes?: string;
}

export interface LocationContact extends BaseEntity {
  location_id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  is_primary: boolean;
}

export interface VendorContact extends BaseEntity {
  vendor_id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  is_primary: boolean;
  event_day_contact: boolean;
  participates_in_events?: string[];
}

export interface SupportTeamEventAssignment extends BaseEntity {
  support_team_id: string;
  event_id: string;
  notes?: string;
}

export interface GuestTableAssignment extends BaseEntity {
  guest_id: string;
  table_id: string;
  event_id?: string;
}

export interface WeddingData extends BaseEntity {
  couple_name_1?: string;
  couple_name_2?: string;
  wedding_date?: string;
  planning_start_date?: string;
  venue?: string;
  total_budget?: number;
  auto_tasks_enabled?: boolean;
  last_planning_start_date?: string;
  last_wedding_date?: string;
  auto_tasks_initialized?: boolean;
}

export interface Phase extends BaseEntity {
  name: string;
  color: string;
  order_index: number;
  is_system_phase: boolean;
}

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  category: string;
  phase_id?: string;
  start_date?: string;
  due_date?: string;
  completed: boolean;
  completed_at?: string;
  priority: 'high' | 'medium' | 'low';
  depends_on?: string[];
  assigned_to?: string;
  notes?: string;
  is_system_task?: boolean;
  template_id?: string;
  offset_weeks?: number;
  offset_type?: string;
  needs_adjustment_warning?: boolean;
  warning_dismissed?: boolean;
  is_system_generated?: boolean;
  manually_modified?: boolean;
  date_change_notice?: string;
}

class StorageAdapter {
  guests = new LocalStorageAdapter<Guest>('guests');
  events = new LocalStorageAdapter<Event>('events');
  vendors = new LocalStorageAdapter<Vendor>('vendors');
  locations = new LocalStorageAdapter<Location>('locations');
  supportTeam = new LocalStorageAdapter<SupportTeam>('support_team');
  budgetItems = new LocalStorageAdapter<BudgetItem>('budget_items');
  tables = new LocalStorageAdapter<Table>('tables');
  programItems = new LocalStorageAdapter<ProgramItem>('program_items');
  locationContacts = new LocalStorageAdapter<LocationContact>('location_contacts');
  vendorContacts = new LocalStorageAdapter<VendorContact>('vendor_contacts');
  supportTeamEventAssignments = new LocalStorageAdapter<SupportTeamEventAssignment>('support_team_event_assignments');
  guestTableAssignments = new LocalStorageAdapter<GuestTableAssignment>('guest_table_assignments');
  weddingData = new LocalStorageAdapter<WeddingData>('wedding_data');
  tasks = new LocalStorageAdapter<Task>('tasks');
  phases = new LocalStorageAdapter<Phase>('phases');

  constructor() {
    this.initializeVersion();
  }

  private initializeVersion(): void {
    const currentVersion = localStorage.getItem(VERSION_KEY);
    if (!currentVersion) {
      localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    }
  }

  getStorageStats() {
    let totalSize = 0;
    const stats: Record<string, number> = {};

    for (const key in localStorage) {
      if (key.startsWith(STORAGE_PREFIX)) {
        const size = localStorage.getItem(key)?.length || 0;
        totalSize += size;
        stats[key] = size;
      }
    }

    const maxSize = 5 * 1024 * 1024;
    const usagePercent = (totalSize / maxSize) * 100;

    return {
      totalSize,
      maxSize,
      usagePercent: Math.round(usagePercent * 100) / 100,
      details: stats,
      formattedSize: this.formatBytes(totalSize),
      formattedMax: this.formatBytes(maxSize)
    };
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  exportAll(): ValidatedExportedData {
    try {
      return {
        schemaVersion: 1,
        version: STORAGE_VERSION,
        exported: new Date().toISOString(),
        guests: this.guests.getAll(),
        events: this.events.getAll(),
        vendors: this.vendors.getAll(),
        locations: this.locations.getAll(),
        support_team: this.supportTeam.getAll(),
        budget_items: this.budgetItems.getAll(),
        tables: this.tables.getAll(),
        program_items: this.programItems.getAll(),
        location_contacts: this.locationContacts.getAll(),
        vendor_contacts: this.vendorContacts.getAll(),
        support_team_event_assignments: this.supportTeamEventAssignments.getAll(),
        guest_table_assignments: this.guestTableAssignments.getAll(),
        wedding_data: this.weddingData.getAll(),
        tasks: this.tasks.getAll(),
        phases: this.phases.getAll(),
      };
    } catch (error) {
      console.error('Error during exportAll, returning empty data:', error);
      return createEmptyWeddingData();
    }
  }

  importAll(jsonString: string): ImportResult {
    const errors: string[] = [];
    let previousData: ValidatedExportedData | null = null;

    try {
      let parsed: unknown;
      try {
        parsed = JSON.parse(jsonString);
      } catch (parseError) {
        return {
          ok: false,
          imported: 0,
          skipped: 0,
          errors: ['Ungültiges JSON-Format. Bitte überprüfen Sie die Datei.'],
        };
      }

      const validationResult = ExportedDataSchema.safeParse(parsed);

      if (!validationResult.success) {
        const zodErrors = validationResult.error.issues.map((err: any) =>
          `${err.path.join('.')}: ${err.message}`
        );
        return {
          ok: false,
          imported: 0,
          skipped: 0,
          errors: [`Datenvalidierung fehlgeschlagen:`, ...zodErrors],
        };
      }

      const validatedData = validationResult.data;

      if (validatedData.schemaVersion !== 1) {
        return {
          ok: false,
          imported: 0,
          skipped: 0,
          errors: [`Nicht unterstützte Schema-Version: ${validatedData.schemaVersion}. Erwartet: 1`],
        };
      }

      try {
        previousData = this.exportAll();
      } catch (backupError) {
        console.error('Warning: Could not create backup before import:', backupError);
      }

      try {
        this.guests.replaceAll(validatedData.guests);
        this.events.replaceAll(validatedData.events);
        this.vendors.replaceAll(validatedData.vendors);
        this.locations.replaceAll(validatedData.locations);
        this.supportTeam.replaceAll(validatedData.support_team);
        this.budgetItems.replaceAll(validatedData.budget_items);
        this.tables.replaceAll(validatedData.tables);
        this.programItems.replaceAll(validatedData.program_items);
        this.locationContacts.replaceAll(validatedData.location_contacts);
        this.vendorContacts.replaceAll(validatedData.vendor_contacts);
        this.supportTeamEventAssignments.replaceAll(validatedData.support_team_event_assignments);
        this.guestTableAssignments.replaceAll(validatedData.guest_table_assignments);
        this.weddingData.replaceAll(validatedData.wedding_data);
        this.tasks.replaceAll(validatedData.tasks);
        this.phases.replaceAll(validatedData.phases || []);

        const importedCount = countEntities(validatedData);
        return {
          ok: true,
          imported: importedCount,
          skipped: 0,
          errors: [],
        };
      } catch (writeError) {
        if (previousData) {
          try {
            this.guests.replaceAll(previousData.guests);
            this.events.replaceAll(previousData.events);
            this.vendors.replaceAll(previousData.vendors);
            this.locations.replaceAll(previousData.locations);
            this.supportTeam.replaceAll(previousData.support_team);
            this.budgetItems.replaceAll(previousData.budget_items);
            this.tables.replaceAll(previousData.tables);
            this.programItems.replaceAll(previousData.program_items);
            this.locationContacts.replaceAll(previousData.location_contacts);
            this.vendorContacts.replaceAll(previousData.vendor_contacts);
            this.supportTeamEventAssignments.replaceAll(previousData.support_team_event_assignments);
            this.guestTableAssignments.replaceAll(previousData.guest_table_assignments);
            this.weddingData.replaceAll(previousData.wedding_data);
            this.tasks.replaceAll(previousData.tasks);
            this.phases.replaceAll(previousData.phases || []);
            errors.push('Fehler beim Speichern. Vorherige Daten wurden wiederhergestellt.');
          } catch (restoreError) {
            errors.push('Kritischer Fehler: Daten konnten nicht wiederhergestellt werden.');
          }
        } else {
          errors.push('Fehler beim Speichern. Keine Sicherung verfügbar.');
        }

        if (writeError instanceof StorageError) {
          if (writeError.code === 'QUOTA_EXCEEDED') {
            errors.push('Speicherplatz überschritten. Bitte löschen Sie alte Einträge und versuchen Sie es erneut.');
          } else {
            errors.push(`Speicherfehler: ${writeError.message}`);
          }
        } else if (writeError instanceof Error) {
          errors.push(`Fehler: ${writeError.message}`);
        } else {
          errors.push('Unbekannter Fehler beim Speichern der Daten.');
        }

        return {
          ok: false,
          imported: 0,
          skipped: 0,
          errors,
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        errors.push(`Import fehlgeschlagen: ${error.message}`);
      } else {
        errors.push('Unbekannter Fehler beim Import.');
      }
      return {
        ok: false,
        imported: 0,
        skipped: 0,
        errors,
      };
    }
  }

  clearAll() {
    this.guests.clear();
    this.events.clear();
    this.vendors.clear();
    this.locations.clear();
    this.supportTeam.clear();
    this.budgetItems.clear();
    this.tables.clear();
    this.programItems.clear();
    this.locationContacts.clear();
    this.vendorContacts.clear();
    this.supportTeamEventAssignments.clear();
    this.guestTableAssignments.clear();
    this.weddingData.clear();
    this.tasks.clear();
    this.phases.clear();
  }
}

export const storage = new StorageAdapter();
