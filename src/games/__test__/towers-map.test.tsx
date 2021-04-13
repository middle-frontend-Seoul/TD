import { Gun } from '../towers';
import { TowersMap } from '../towers-map';

describe('class TowersMap', () => {
  const towerGun = new Gun();
  const grid: any = [
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
  ];

  test('push to success', () => {
    const towersMap = new TowersMap(grid, 1);
    towersMap.push(towerGun, { x: 0, y: 0 });
    expect(towersMap.getPlaces().length).toBe(1);
  });

  test('push to error', () => {
    const towersMap = new TowersMap(grid, 1);
    expect(() => towersMap.push({} as any, { x: 0, y: 0 })).toThrow();
    expect(() => towersMap.push(towerGun, { x: 0, y: 1 })).toThrow();
  });
});
