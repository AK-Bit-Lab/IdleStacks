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
