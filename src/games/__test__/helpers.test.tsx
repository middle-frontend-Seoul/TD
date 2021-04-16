import { getGridPosition, getGridSize, isArray } from '../helpers';

describe('games helpers', () => {
  test('getGridPosition', () => {
    expect(getGridPosition(10, 5)).toEqual({ width: 0.5, offset: 4 });
  });

  test('isArray to success', () => {
    expect(isArray([])).toBe(true);
  });

  test('isArray to error: не является массиво', () => {
    expect(() => isArray(null as any)).toThrow();
    expect(() => isArray({} as any)).toThrow();
    expect(() => isArray('' as any)).toThrow();
  });

  test('getGridSize to success', () => {
    const grid: any = [
      [0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0],
    ];
    expect(getGridSize(grid)).toEqual({ width: 5, height: 2 });
  });

  test('getGridSize to error', () => {
    expect(() => getGridSize([])).toThrow();
    expect(() => getGridSize([[]])).toThrow();
  });
});
