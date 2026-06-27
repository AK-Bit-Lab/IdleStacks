import { describe, it, expect } from 'vitest';
import { isValidAddress, validateAddress, sanitizeMemo, isValidAmount } from '../validation';

describe('isValidAddress', () => {
  it('rejects null and undefined', () => {
    expect(isValidAddress(null)).toBe(false);
    expect(isValidAddress(undefined)).toBe(false);
  });

  it('rejects empty string', () => {
    expect(isValidAddress('')).toBe(false);
  });

  it('rejects non-STX addresses', () => {
    expect(isValidAddress('0x12345')).toBe(false);
  });

  it('accepts valid mainnet addresses', () => {
    expect(isValidAddress('SP2C2YFP12AJZB4MABJBAJ55XEKVS83V1G4J8X7KW')).toBe(true);
  });

  it('accepts valid testnet addresses', () => {
    expect(isValidAddress('ST2C2YFP12AJZB4MABJBAJ55XEKVS83V1G4J8X7KW')).toBe(true);
  });
});

describe('validateAddress', () => {
  it('returns invalid for missing address', () => {
    const result = validateAddress(null);
    expect(result.valid).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it('returns valid for a correct address', () => {
    const result = validateAddress('SP2C2YFP12AJZB4MABJBAJ55XEKVS83V1G4J8X7KW');
    expect(result.valid).toBe(true);
    expect(result.reason).toBeNull();
  });
});

describe('sanitizeMemo', () => {
  it('returns empty for falsy input', () => {
    expect(sanitizeMemo(null)).toBe('');
    expect(sanitizeMemo('')).toBe('');
  });

  it('strips non-printable characters', () => {
    expect(sanitizeMemo('hello\x00world')).toBe('hello world');
  });

  it('truncates long memos', () => {
    const long = 'a'.repeat(50);
    expect(sanitizeMemo(long).length).toBe(34);
  });
});

describe('isValidAmount', () => {
  it('rejects null and undefined', () => {
    expect(isValidAmount(null)).toBe(false);
    expect(isValidAmount(undefined)).toBe(false);
  });

  it('rejects zero and negative', () => {
    expect(isValidAmount(0)).toBe(false);
    expect(isValidAmount(-1)).toBe(false);
  });

  it('accepts positive integers', () => {
    expect(isValidAmount(1)).toBe(true);
    expect(isValidAmount(1000)).toBe(true);
  });
});
