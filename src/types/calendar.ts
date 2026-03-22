export type CalendarEventType =
  | 'wedding_day_event'
  | 'todo'
  | 'budget_deadline'
  | 'guest_deadline'
  | 'vendor_appointment'
  | 'other_event';

export type CalendarEventSource =
  | 'events'
  | 'todos'
  | 'budget'
  | 'guests'
  | 'vendors';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  endTime?: string;
  type: CalendarEventType;
  source: CalendarEventSource;
  sourceId: string;
  location?: string;
  notes?: string;
  participants?: string[];
  metadata?: Record<string, any>;
}
