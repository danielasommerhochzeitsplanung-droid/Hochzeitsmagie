import { Event } from '../components/EventsModule';

export interface EventConflict {
  event: Event;
  conflictingEvents: Event[];
}

interface TimeRange {
  start: Date;
  end: Date;
}

function parseTime(timeString: string | null): number {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function getEventTimeRange(event: Event): TimeRange | null {
  if (!event.date) return null;

  const baseDate = new Date(event.date);

  const startTime = event.time_start ? parseTime(event.time_start) : 0;
  const endTime = event.time_end ? parseTime(event.time_end) : 0;
  const transportStart = event.transport_time_start ? parseTime(event.transport_time_start) : 0;
  const transportEnd = event.transport_time_end ? parseTime(event.transport_time_end) : 0;

  const effectiveStartMinutes = startTime - transportStart;
  const effectiveEndMinutes = endTime + transportEnd;

  const startDate = new Date(baseDate);
  startDate.setHours(0, effectiveStartMinutes, 0, 0);

  const endDate = new Date(baseDate);
  endDate.setHours(0, effectiveEndMinutes, 0, 0);

  if (effectiveEndMinutes < effectiveStartMinutes) {
    endDate.setDate(endDate.getDate() + 1);
  }

  return { start: startDate, end: endDate };
}

function timeRangesOverlap(range1: TimeRange, range2: TimeRange): boolean {
  return range1.start < range2.end && range2.start < range1.end;
}

export function findEventConflicts(event: Event, allEvents: Event[]): Event[] {
  const eventRange = getEventTimeRange(event);
  if (!eventRange) return [];

  const conflicts: Event[] = [];

  for (const otherEvent of allEvents) {
    if (otherEvent.id === event.id) continue;

    const otherRange = getEventTimeRange(otherEvent);
    if (!otherRange) continue;

    if (timeRangesOverlap(eventRange, otherRange)) {
      conflicts.push(otherEvent);
    }
  }

  return conflicts;
}

export function getAllEventConflicts(events: Event[]): Map<string, Event[]> {
  const conflictsMap = new Map<string, Event[]>();

  for (const event of events) {
    const conflicts = findEventConflicts(event, events);
    if (conflicts.length > 0) {
      conflictsMap.set(event.id, conflicts);
    }
  }

  return conflictsMap;
}

export function formatEventTimeWithTransport(event: Event, lang: 'de' | 'en'): string {
  if (!event.date) return '';

  const parts: string[] = [];

  const date = new Date(event.date);
  parts.push(date.toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }));

  if (event.transport_time_start) {
    parts.push(`${event.transport_time_start.substring(0, 5)}`);
  } else if (event.time_start) {
    parts.push(`${event.time_start.substring(0, 5)}`);
  }

  if (event.time_end) {
    parts.push(`- ${event.time_end.substring(0, 5)}`);
  }

  if (event.transport_time_end) {
    parts.push(`(+${event.transport_time_end.substring(0, 5)})`);
  }

  return parts.join(' ');
}
