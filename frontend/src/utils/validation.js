/* global URL */
/* global URL */
const STX_ADDRESS_REGEX = /^[ST][12][0-9A-HJ-NP-Za-km-z]{38,40}$/;
const MAX_MEMO_LENGTH = 34;

/**
 * Check whether a string looks like a valid Stacks mainnet or testnet address.
 */
export const isValidAddress = (address) => {
  return typeof address === 'string' && STX_ADDRESS_REGEX.test(address.trim());
};

/**
 * Validate a Stacks address and return a reason if invalid.
 */
export const validateAddress = (address) => {
  if (!address) return { valid: false, reason: 'Address is required' };
  if (typeof address !== 'string') return { valid: false, reason: 'Address must be a string' };
  const trimmed = address.trim();
  if (!trimmed.startsWith('SP') && !trimmed.startsWith('ST')) {
    return { valid: false, reason: 'Address must start with SP or ST' };
  }
  if (trimmed.length < 39 || trimmed.length > 41) {
    return { valid: false, reason: 'Address has an unexpected length' };
  }
  return { valid: true, reason: null };
};

/**
 * Sanitize a memo string to only contain printable ASCII characters,
 * truncated to the Stacks memo limit.
 */
export const sanitizeMemo = (memo) => {
  if (!memo) return '';
  const cleaned = memo.replace(/[^\x20-\x7E]/g, '').trim();
  return cleaned.slice(0, MAX_MEMO_LENGTH);
};

/**
 * Check if a number is a positive integer (for use with u128 amounts).
 */
export const isValidAmount = (value) => {
  if (value == null) return false;
  const num = Number(value);
  return Number.isFinite(num) && num > 0 && Number.isInteger(num);
};

/**
 * Check whether a string is a valid HTTP/HTTPS URL.
 *
 * @param {string} url
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Validate a poll title string.
 * Must be between 3 and 100 characters and non-empty.
 *
 * @param {string} title
 * @returns {{ valid: boolean, reason: string|null }}
 */
export const validatePollTitle = (title) => {
  if (!title || typeof title !== 'string') return { valid: false, reason: 'Title is required' };
  const trimmed = title.trim();
  if (trimmed.length < 3) return { valid: false, reason: 'Title must be at least 3 characters' };
  if (trimmed.length > 100)
    return { valid: false, reason: 'Title must be 100 characters or fewer' };
  return { valid: true, reason: null };
};

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,32}$/;

/**
 * Validates a player username.
 * Allows letters, numbers, underscores, and hyphens — 3 to 32 characters.
 *
 * @param {string} username
 * @returns {{ valid: boolean, reason: string|null }}
 */
export const validateUsername = (username) => {
  if (!username || typeof username !== 'string')
    return { valid: false, reason: 'Username is required' };
  const trimmed = username.trim();
  if (trimmed.length < 3) return { valid: false, reason: 'Username must be at least 3 characters' };
  if (trimmed.length > 32)
    return { valid: false, reason: 'Username must be 32 characters or fewer' };
  if (!USERNAME_REGEX.test(trimmed))
    return { valid: false, reason: 'Username may only contain letters, numbers, _ and -' };
  return { valid: true, reason: null };
};
