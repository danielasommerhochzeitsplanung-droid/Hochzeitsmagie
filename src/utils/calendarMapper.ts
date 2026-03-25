import { CalendarEvent, EventPriority } from '../types/calendar';
import type {
  Event,
  BudgetItem,
  Guest,
  Vendor,
  Task,
} from '../lib/storage-adapter';

interface CalendarDataInput {
  wedding_date?: string;
  events: Event[];
  tasks: Task[];
  budgetItems: BudgetItem[];
  guests: Guest[];
  vendors: Vendor[];
}

function getEventPriority(metadata?: Record<string, any>): EventPriority {
  if (metadata?.priority === 'high' || metadata?.completed === false) return 'high';
  if (metadata?.is_milestone || metadata?.type === 'deadline') return 'high';
  if (metadata?.type === 'payment' || metadata?.paid) return 'high';
  return 'medium';
}

function getEventIcon(source: string, metadata?: Record<string, any>): string {
  if (metadata?.is_milestone || metadata?.is_wedding_day) return '⛪';
  if (metadata?.is_planning_start) return '📝';
  if (metadata?.completed === false) return '⚠️';
  if (metadata?.type === 'deadline' || metadata?.type === 'payment') return '🎯';

  switch (source) {
    case 'todos': return '📋';
    case 'guests': return '👥';
    case 'vendors': return '💼';
    case 'locations': return '📍';
    case 'events': return '🎉';
    case 'budget': return '💰';
    case 'support_team': return '👫';
    default: return '📅';
  }
}

export function getAllCalendarEvents(data: CalendarDataInput | undefined): CalendarEvent[] {
  if (!data) return [];

  const events: CalendarEvent[] = [];

  const weddingDate = data.wedding_date;

  events.push(...mapEventsToCalendar(data.events || [], weddingDate));
  events.push(...mapTasksToCalendar(data.tasks || []));
  events.push(...mapBudgetToCalendar(data.budgetItems || []));
  events.push(...mapGuestsToCalendar(data.guests || []));
  events.push(...mapVendorsToCalendar(data.vendors || []));

  return events.sort((a, b) => {
    const dateA = new Date(a.date + (a.time ? `T${a.time}` : '')).getTime();
    const dateB = new Date(b.date + (b.time ? `T${b.time}` : '')).getTime();
    return dateA - dateB;
  });
}

function mapEventsToCalendar(
  events: any[],
  weddingDate?: string
): CalendarEvent[] {
  const browserLang = navigator.language.split('-')[0];
  const lang = browserLang === 'de' ? 'de' : 'en';

  return events
    .filter((event) => event.date)
    .map((event) => {
      const isWeddingDay = weddingDate && event.date === weddingDate;
      const title = event.name_de && event.name_en
        ? (lang === 'de' ? event.name_de : event.name_en)
        : event.title || 'Unnamed Event';

      const isPlanningStart = (event.name_de === 'Planungsstart' || event.name_en === 'Planning Start');
      const isWeddingDayEvent = (event.name_de === 'Hochzeitstag' || event.name_en === 'Wedding Day') || isWeddingDay;

      const metadata = {
        category: event.category,
        is_milestone: event.is_milestone,
        protected: event.protected,
        is_planning_start: isPlanningStart,
        is_wedding_day: isWeddingDayEvent,
      };

      return {
        id: `event-${event.id}`,
        title,
        date: event.date!,
        time: event.time_start || event.startTime,
        endTime: event.time_end || event.endTime,
        type: isWeddingDay ? ('wedding_day_event' as const) : ('other_event' as const),
        source: 'events' as const,
        sourceId: event.id,
        location: event.location,
        notes: event.transport_notes || event.notes,
        participants: event.attendees,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('events', metadata),
      };
    });
}

function mapTasksToCalendar(tasks: Task[]): CalendarEvent[] {
  return tasks
    .filter((task) => task.due_date)
    .map((task) => {
      const metadata = {
        completed: task.completed,
        priority: task.priority,
        category: task.category,
      };

      return {
        id: `task-${task.id}`,
        title: task.title,
        date: task.due_date!,
        type: 'todo' as const,
        source: 'todos' as const,
        sourceId: task.id,
        notes: task.description,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('todos', metadata),
      };
    });
}

function mapBudgetToCalendar(budget: BudgetItem[]): CalendarEvent[] {
  return budget
    .filter((item) => item.paid)
    .map((item) => {
      const metadata = {
        estimatedCost: item.estimated_cost,
        actualCost: item.actual_cost,
        paid: item.paid,
        type: 'payment',
      };

      return {
        id: `budget-${item.id}`,
        title: `${item.category}: ${item.item_name || 'Budget Item'}`,
        date: new Date().toISOString().split('T')[0],
        type: 'budget_deadline' as const,
        source: 'budget' as const,
        sourceId: item.id,
        notes: item.notes,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('budget', metadata),
      };
    });
}

function mapGuestsToCalendar(guests: Guest[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  guests.forEach((guest) => {
    if (guest.save_the_date_sent_date) {
      const metadata = {
        type: 'save-the-date',
        email: guest.email,
      };

      events.push({
        id: `guest-std-${guest.id}`,
        title: `Save-the-Date: ${guest.name}`,
        date: guest.save_the_date_sent_date,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('guests', metadata),
      });
    }

    if (guest.invitation_sent_date) {
      const metadata = {
        type: 'invitation',
        email: guest.email,
      };

      events.push({
        id: `guest-inv-${guest.id}`,
        title: `Einladung: ${guest.name}`,
        date: guest.invitation_sent_date,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('guests', metadata),
      });
    }

    if (guest.rsvp_date) {
      const metadata = {
        type: 'rsvp',
        status: guest.rsvp_status,
      };

      events.push({
        id: `guest-rsvp-${guest.id}`,
        title: `RSVP: ${guest.name}`,
        date: guest.rsvp_date,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('guests', metadata),
      });
    }
  });

  return events;
}

function mapVendorsToCalendar(vendors: Vendor[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  vendors.forEach((vendor) => {
    if (vendor.next_appointment) {
      const metadata = {
        type: 'meeting',
        category: vendor.category,
        phone: vendor.phone,
        email: vendor.email,
      };

      events.push({
        id: `vendor-meeting-${vendor.id}`,
        title: `Termin: ${vendor.name}`,
        date: vendor.next_appointment,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        notes: vendor.notes,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('vendors', metadata),
      });
    }

    if (vendor.first_contact_date) {
      const metadata = {
        type: 'first_contact',
        category: vendor.category,
      };

      events.push({
        id: `vendor-contact-${vendor.id}`,
        title: `Erstkontakt: ${vendor.name}`,
        date: vendor.first_contact_date,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('vendors', metadata),
      });
    }

    if (vendor.final_payment_due) {
      const metadata = {
        type: 'payment',
        estimatedCost: vendor.cost,
      };

      events.push({
        id: `vendor-payment-${vendor.id}`,
        title: `Zahlung fällig: ${vendor.name}`,
        date: vendor.final_payment_due,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        metadata,
        priority: getEventPriority(metadata),
        icon: getEventIcon('vendors', metadata),
      });
    }
  });

  return events;
}
