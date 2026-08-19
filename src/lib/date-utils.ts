type DateValue = Date | string;

function toDate(value: DateValue) {
  return value instanceof Date ? value : new Date(value);
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

const RELATIVE_TIME_UNITS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: "year", ms: 365 * 24 * 60 * 60 * 1000 },
  { unit: "month", ms: 30 * 24 * 60 * 60 * 1000 },
  { unit: "week", ms: 7 * 24 * 60 * 60 * 1000 },
  { unit: "day", ms: 24 * 60 * 60 * 1000 },
  { unit: "hour", ms: 60 * 60 * 1000 },
  { unit: "minute", ms: 60 * 1000 },
];

/**
 * Format a date into a localized relative time string (e.g. "2 days ago")
 *
 * @param value The date to format
 * @returns A localized relative time string
 */
export function formatDateRelative(value: DateValue) {
  const diffMs = toDate(value).getTime() - Date.now();

  for (const { unit, ms } of RELATIVE_TIME_UNITS) {
    if (Math.abs(diffMs) >= ms) {
      return relativeTimeFormatter.format(Math.round(diffMs / ms), unit);
    }
  }

  return relativeTimeFormatter.format(Math.round(diffMs / 1000), "second");
}
