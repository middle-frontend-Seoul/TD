import { Gun } from '../towers';
import { GameError } from '../game-error';
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

  test('push to error: Не является экземпляром класса Tower', () => {
    const towersMap = new TowersMap(grid, 1);
    const error = new GameError('Не является экземпляром класса Tower');
    expect(() => towersMap.push({} as any, { x: 0, y: 0 })).toThrow(error);
  });

  test('push to error: Здесь нельзя устанавливать башню', () => {
    const towersMap = new TowersMap(grid, 1);
    const error = new GameError('Здесь нельзя устанавливать башню');
    expect(() => towersMap.push(towerGun, { x: 0, y: 1 })).toThrow(error);
  });

  test('push to error: Место занято', () => {
    const towersMap = new TowersMap(grid, 1);
    const error = new GameError('Место занято');
    towersMap.push(towerGun, { x: 0, y: 0 });
    expect(() => towersMap.push(towerGun, { x: 0, y: 0 })).toThrow(error);
  });
});
