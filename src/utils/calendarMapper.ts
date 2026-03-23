import { CalendarEvent } from '../types/calendar';
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
        metadata: {
          category: event.category,
          is_milestone: event.is_milestone,
          protected: event.protected,
        },
      };
    });
}

function mapTasksToCalendar(tasks: Task[]): CalendarEvent[] {
  return tasks
    .filter((task) => task.due_date)
    .map((task) => ({
      id: `task-${task.id}`,
      title: task.title,
      date: task.due_date!,
      type: 'todo' as const,
      source: 'todos' as const,
      sourceId: task.id,
      notes: task.description,
      metadata: {
        completed: task.completed,
        priority: task.priority,
        category: task.category,
      },
    }));
}

function mapBudgetToCalendar(budget: BudgetItem[]): CalendarEvent[] {
  return budget
    .filter((item) => item.paid)
    .map((item) => ({
      id: `budget-${item.id}`,
      title: `${item.category}: ${item.item_name || 'Budget Item'}`,
      date: new Date().toISOString().split('T')[0],
      type: 'budget_deadline' as const,
      source: 'budget' as const,
      sourceId: item.id,
      notes: item.notes,
      metadata: {
        estimatedCost: item.estimated_cost,
        actualCost: item.actual_cost,
        paid: item.paid,
      },
    }));
}

function mapGuestsToCalendar(guests: Guest[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  guests.forEach((guest) => {
    if (guest.save_the_date_sent_date) {
      events.push({
        id: `guest-std-${guest.id}`,
        title: `Save-the-Date: ${guest.name}`,
        date: guest.save_the_date_sent_date,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata: {
          type: 'save-the-date',
          email: guest.email,
        },
      });
    }

    if (guest.invitation_sent_date) {
      events.push({
        id: `guest-inv-${guest.id}`,
        title: `Einladung: ${guest.name}`,
        date: guest.invitation_sent_date,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata: {
          type: 'invitation',
          email: guest.email,
        },
      });
    }

    if (guest.rsvp_date) {
      events.push({
        id: `guest-rsvp-${guest.id}`,
        title: `RSVP: ${guest.name}`,
        date: guest.rsvp_date,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata: {
          type: 'rsvp',
          status: guest.rsvp_status,
        },
      });
    }
  });

  return events;
}

function mapVendorsToCalendar(vendors: Vendor[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  vendors.forEach((vendor) => {
    if (vendor.next_appointment) {
      events.push({
        id: `vendor-meeting-${vendor.id}`,
        title: `Termin: ${vendor.name}`,
        date: vendor.next_appointment,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        notes: vendor.notes,
        metadata: {
          type: 'meeting',
          category: vendor.category,
          phone: vendor.phone,
          email: vendor.email,
        },
      });
    }

    if (vendor.first_contact_date) {
      events.push({
        id: `vendor-contact-${vendor.id}`,
        title: `Erstkontakt: ${vendor.name}`,
        date: vendor.first_contact_date,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        metadata: {
          type: 'first_contact',
          category: vendor.category,
        },
      });
    }

    if (vendor.final_payment_due) {
      events.push({
        id: `vendor-payment-${vendor.id}`,
        title: `Zahlung fällig: ${vendor.name}`,
        date: vendor.final_payment_due,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        metadata: {
          type: 'payment',
          estimatedCost: vendor.cost,
        },
      });
    }
  });

  return events;
}
