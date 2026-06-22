export const calculatePercentage = (value, total, precision = 2) => {
  if (!total || total === 0) return 0;
  const percentage = (value / total) * 100;
  return Number(percentage.toFixed(precision));
};

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
