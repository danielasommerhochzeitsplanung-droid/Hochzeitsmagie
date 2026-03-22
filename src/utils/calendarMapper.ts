import { CalendarEvent } from '../types/calendar';
import type {
  Event,
  Todo,
  BudgetItem,
  Guest,
  Vendor,
  WeddingData,
} from '../schemas/weddingData.schema';

export function getAllCalendarEvents(data: WeddingData | undefined): CalendarEvent[] {
  if (!data) return [];

  const events: CalendarEvent[] = [];

  const weddingDate = data.settings?.weddingDate;

  events.push(...mapEventsToCalendar(data.events || [], weddingDate));
  events.push(...mapTodosToCalendar(data.todos || []));
  events.push(...mapBudgetToCalendar(data.budget || []));
  events.push(...mapGuestsToCalendar(data.guests || []));
  events.push(...mapVendorsToCalendar(data.vendors || []));

  return events.sort((a, b) => {
    const dateA = new Date(a.date + (a.time ? `T${a.time}` : '')).getTime();
    const dateB = new Date(b.date + (b.time ? `T${b.time}` : '')).getTime();
    return dateA - dateB;
  });
}

function mapEventsToCalendar(
  events: Event[],
  weddingDate?: string
): CalendarEvent[] {
  return events
    .filter((event) => event.date)
    .map((event) => {
      const isWeddingDay = weddingDate && event.date === weddingDate;

      return {
        id: `event-${event.id}`,
        title: event.title,
        date: event.date!,
        time: event.startTime,
        endTime: event.endTime,
        type: isWeddingDay ? ('wedding_day_event' as const) : ('other_event' as const),
        source: 'events' as const,
        sourceId: event.id,
        location: event.location,
        notes: event.notes,
        participants: event.attendees,
        metadata: {
          category: event.category,
        },
      };
    });
}

function mapTodosToCalendar(todos: Todo[]): CalendarEvent[] {
  return todos
    .filter((todo) => todo.dueDate)
    .map((todo) => ({
      id: `todo-${todo.id}`,
      title: todo.title,
      date: todo.dueDate!,
      type: 'todo' as const,
      source: 'todos' as const,
      sourceId: todo.id,
      notes: todo.description,
      metadata: {
        completed: todo.completed,
        priority: todo.priority,
        category: todo.category,
      },
    }));
}

function mapBudgetToCalendar(budget: BudgetItem[]): CalendarEvent[] {
  return budget
    .filter((item) => item.paymentDate || item.dueDate)
    .map((item) => ({
      id: `budget-${item.id}`,
      title: `${item.category}: ${item.item}`,
      date: item.paymentDate || item.dueDate!,
      type: 'budget_deadline' as const,
      source: 'budget' as const,
      sourceId: item.id,
      notes: item.notes,
      metadata: {
        estimatedCost: item.estimatedCost,
        actualCost: item.actualCost,
        paid: item.paid,
        vendor: item.vendor,
      },
    }));
}

function mapGuestsToCalendar(guests: Guest[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  guests.forEach((guest) => {
    if (guest.saveTheDateSent) {
      events.push({
        id: `guest-std-${guest.id}`,
        title: `Save-the-Date: ${guest.firstName} ${guest.lastName}`,
        date: guest.saveTheDateSent,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata: {
          type: 'save-the-date',
          email: guest.email,
        },
      });
    }

    if (guest.invitationSent) {
      events.push({
        id: `guest-inv-${guest.id}`,
        title: `Einladung: ${guest.firstName} ${guest.lastName}`,
        date: guest.invitationSent,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata: {
          type: 'invitation',
          email: guest.email,
        },
      });
    }

    if (guest.rsvpDate) {
      events.push({
        id: `guest-rsvp-${guest.id}`,
        title: `RSVP: ${guest.firstName} ${guest.lastName}`,
        date: guest.rsvpDate,
        type: 'guest_deadline' as const,
        source: 'guests' as const,
        sourceId: guest.id,
        metadata: {
          type: 'rsvp',
          status: guest.status,
        },
      });
    }
  });

  return events;
}

function mapVendorsToCalendar(vendors: Vendor[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  vendors.forEach((vendor) => {
    if (vendor.meetingDate) {
      events.push({
        id: `vendor-meeting-${vendor.id}`,
        title: `Termin: ${vendor.name}`,
        date: vendor.meetingDate,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        location: vendor.address,
        notes: vendor.notes,
        metadata: {
          type: 'meeting',
          category: vendor.category,
          contactPerson: vendor.contactPerson,
          phone: vendor.phone,
          email: vendor.email,
        },
      });
    }

    if (vendor.contractDate) {
      events.push({
        id: `vendor-contract-${vendor.id}`,
        title: `Vertrag: ${vendor.name}`,
        date: vendor.contractDate,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        metadata: {
          type: 'contract',
          category: vendor.category,
        },
      });
    }

    if (vendor.paymentDueDate) {
      events.push({
        id: `vendor-payment-${vendor.id}`,
        title: `Zahlung fällig: ${vendor.name}`,
        date: vendor.paymentDueDate,
        type: 'vendor_appointment' as const,
        source: 'vendors' as const,
        sourceId: vendor.id,
        metadata: {
          type: 'payment',
          estimatedCost: vendor.estimatedCost,
          actualCost: vendor.actualCost,
        },
      });
    }
  });

  return events;
}
