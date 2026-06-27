const ADDRESS_PREFIX_LENGTH = 6;
const ADDRESS_SUFFIX_LENGTH = 4;

export const formatAddress = (address) => {
  if (!address) return '';
  if (address.length <= ADDRESS_PREFIX_LENGTH + ADDRESS_SUFFIX_LENGTH) return address;
  return `${address.slice(0, ADDRESS_PREFIX_LENGTH)}...${address.slice(-ADDRESS_SUFFIX_LENGTH)}`;
};

export const formatAmount = (amount) => {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  });
};

export const formatNumber = (value) => {
  if (value == null || Number.isNaN(Number(value))) return '0';
  return Number(value).toLocaleString('en-US');
};

/**
 * Formats a raw micro-STX amount into a human-readable STX string.
 *
 * @param {number|string} microStx - Amount in micro-STX (1 STX = 1,000,000 micro-STX)
 * @param {number} [decimals=6] - Max decimal places to show
 * @returns {string} Formatted STX value, e.g. "1.500000 STX"
 */
export const formatMicroSTX = (microStx, decimals = 6) => {
  const stx = Number(microStx) / 1_000_000;
  if (Number.isNaN(stx)) return '0 STX';
  return `${stx.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals })} STX`;
};

/**
 * Formats a STX amount for display, appending the STX ticker.
 *
 * @param {number|string} amount - Amount in full STX units
 * @param {number} [decimals=2] - Max decimal places
 * @returns {string}
 */
export const formatSTX = (amount, decimals = 2) => {
  const n = Number(amount);
  if (Number.isNaN(n)) return '0 STX';
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals })} STX`;
};

export const formatTimeAgo = (isoString) => {
  if (!isoString) return '';
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  if (diffMs < 0) return 'just now';
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(isoString).toLocaleDateString();
};

/**
 * Formats a number using compact notation (K, M, B).
 * Useful for large scores and leaderboard values.
 *
 * @param {number} value - The numeric value to format
 * @returns {string} Compact representation, e.g. "1.2K"
 */
export const formatCompact = (value) => {
  const n = Number(value);
  if (Number.isNaN(n)) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
};

/**
 * Formats a byte count into a human-readable string.
 *
 * @param {number} bytes - Raw byte count
 * @param {number} [decimals=2] - Decimal precision
 * @returns {string} e.g. "1.50 KB"
 */
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};
