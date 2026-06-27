export function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function timeAgo(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 0) return 'just now';

  const intervals = [
    { label: 'y', seconds: 31536000 },
    { label: 'mo', seconds: 2592000 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
    { label: 's', seconds: 1 },
  ];

  for (const { label, seconds: sec } of intervals) {
    const count = Math.floor(seconds / sec);
    if (count >= 1) return `${count}${label} ago`;
  }
  return 'just now';
}

/**
 * Format a number of seconds into a human-readable duration string.
 */
export function formatDuration(totalSeconds) {
  if (totalSeconds == null || totalSeconds < 0) return '';
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);

  if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

/**
 * Returns true if the given timestamp falls on today's date.
 *
 * @param {number|string} timestamp - Unix ms or ISO date string
 * @returns {boolean}
 */
export function isToday(timestamp) {
  if (!timestamp) return false;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Returns true if two timestamps fall on the same calendar day.
 *
 * @param {number|string} a
 * @param {number|string} b
 * @returns {boolean}
 */
export function isSameDay(a, b) {
  const dateA = new Date(a);
  const dateB = new Date(b);
  if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) return false;
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

/**
 * Returns true if the given timestamp is in the past.
 *
 * @param {number|string} timestamp - Unix ms or ISO date string
 * @returns {boolean}
 */
export function isExpired(timestamp) {
  if (!timestamp) return false;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return false;
  return date.getTime() < Date.now();
}

/**
 * Returns a new Date set to midnight (00:00:00.000) of the given date.
 *
 * @param {number|string|Date} [date=new Date()] - Input date
 * @returns {Date}
 */
export function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
