export const calculatePercentage = (value, total, precision = 2) => {
  if (!total || total === 0) return 0;
  const percentage = (value / total) * 100;
  return Number(percentage.toFixed(precision));
};

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/**
 * Linearly interpolates between two numbers.
 *
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor clamped to [0, 1]
 * @returns {number}
 */
export const lerp = (start, end, t) => start + (end - start) * clamp(t, 0, 1);

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} value - The number to round
 * @param {number} [decimals=2] - Number of decimal places
 * @returns {number}
 */
export const roundTo = (value, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

/**
 * Maps a value from one range to another.
 *
 * @param {number} value - Input value
 * @param {number} inMin - Input range minimum
 * @param {number} inMax - Input range maximum
 * @param {number} outMin - Output range minimum
 * @param {number} outMax - Output range maximum
 * @returns {number}
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
