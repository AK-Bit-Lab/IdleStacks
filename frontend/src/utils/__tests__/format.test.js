import { describe, it, expect } from 'vitest';
import { formatAddress, formatAmount, formatNumber, formatTimeAgo } from '../format';

describe('formatAddress', () => {
  it('returns empty string for null or undefined', () => {
    expect(formatAddress(null)).toBe('');
    expect(formatAddress(undefined)).toBe('');
  });

  it('returns full address when it is short enough', () => {
    expect(formatAddress('SP1234')).toBe('SP1234');
  });

  it('truncates long addresses with ellipsis', () => {
    const addr = 'SP2C2YFP12AJZB4MABJBAJ55XEKVS83V1G4J8X7KW';
    const result = formatAddress(addr);
    expect(result).toBe('SP2C2Y...X7KW');
    expect(result.length).toBeLessThan(addr.length);
  });
});

describe('formatAmount', () => {
  it('formats zero correctly', () => {
    expect(formatAmount(0)).toBe('0');
  });

  it('formats large numbers with commas', () => {
    expect(formatAmount(1000000)).toBe('1,000,000');
  });

  it('handles string inputs', () => {
    expect(formatAmount('500')).toBe('500');
  });
});

describe('formatNumber', () => {
  it('returns 0 for invalid values', () => {
    expect(formatNumber(null)).toBe('0');
    expect(formatNumber(undefined)).toBe('0');
    expect(formatNumber(NaN)).toBe('0');
    expect(formatNumber('abc')).toBe('0');
  });

  it('formats valid numbers', () => {
    expect(formatNumber(42)).toBe('42');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });
});

describe('formatTimeAgo', () => {
  it('returns empty string for falsy input', () => {
    expect(formatTimeAgo(null)).toBe('');
    expect(formatTimeAgo(undefined)).toBe('');
    expect(formatTimeAgo('')).toBe('');
  });

  it('returns just now for future dates', () => {
    const future = new Date(Date.now() + 100000).toISOString();
    expect(formatTimeAgo(future)).toBe('just now');
  });

  it('returns seconds ago', () => {
    const tenSecAgo = new Date(Date.now() - 10000).toISOString();
    expect(formatTimeAgo(tenSecAgo)).toBe('10s ago');
  });

  it('returns minutes ago', () => {
    const fiveMinAgo = new Date(Date.now() - 300000).toISOString();
    expect(formatTimeAgo(fiveMinAgo)).toBe('5m ago');
  });

  it('returns hours ago', () => {
    const threeHrAgo = new Date(Date.now() - 10800000).toISOString();
    expect(formatTimeAgo(threeHrAgo)).toBe('3h ago');
  });

  it('returns days ago', () => {
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString();
    expect(formatTimeAgo(twoDaysAgo)).toBe('2d ago');
  });
});