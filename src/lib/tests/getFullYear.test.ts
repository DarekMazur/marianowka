import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { getFullYear } from '../getFullYear.ts';

describe('getFullYear', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('should give back a year of frozen time', () => {
    const mockDate = new Date(2026, 2, 15);
    vi.setSystemTime(mockDate);

    const result = getFullYear();

    expect(result).toBe(2026);
  });

  test('should correctly handle leap years or year-end transitions', () => {
    const mockDate = new Date(2030, 11, 31);
    vi.setSystemTime(mockDate);

    const result = getFullYear();

    expect(result).toBe(2030);
  });
});
