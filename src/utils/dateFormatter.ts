/**
 * Date formatting utilities to prevent timezone-related date shifts
 *
 * IMPORTANT: Always use formatLocalDate() instead of date.toISOString().split('T')[0]
 * to prevent UTC conversion issues (e.g., 2026-04-15 in Berlin becoming 2026-04-14 UTC)
 */

/**
 * Converts a Date object to a local YYYY-MM-DD string without UTC conversion
 * @param date - The date to format
 * @returns Local date string in YYYY-MM-DD format
 */
export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parses a YYYY-MM-DD date string into a Date object at local midnight
 * @param dateStr - Date string in YYYY-MM-DD format
 * @returns Date object at local midnight
 */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}
