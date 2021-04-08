import { Tower } from './towers';
import { Enemy } from './enemies';
import { isRadius } from './helpers';
import { GameError } from './game-error';
import { Position, GridType } from './typing';

export type PlaceType = {
  tower: Tower;
  position: Position;
};

export class TowersMap {
  protected size: number;
  protected grid: GridType;
  protected places: PlaceType[];

  constructor(grid: GridType, size = 30) {
    this.size = size;
    this.grid = grid;
    this.places = [];
  }

  public draw = (ctx: CanvasRenderingContext2D): void => {
    this.places.forEach(({ tower, position }) => {
      tower.draw(ctx, position);
    });
  };

  public push = (tower: Tower, position: Position): boolean | never => {
    if (!this.isFreeSpace(position)) {
      throw new GameError('Место занято');
    }

    if (!this.isFreeGrid(position)) {
      throw new GameError('Здесь нельзя устанавливать башню');
    }

    this.places.push({ tower, position });
    return true;
  };

  /**
   * Метод проверяет наличие врагов
   * в радиусе действия   *
   */
  public update = (entities: Enemy[]): void => {
    this.places.forEach(({ tower, position }) => {
      const radius = tower.getRaduis() * this.size;
      const center: Position = {
        x: position.x + this.size / 2,
        y: position.y + this.size / 2,
      };

      const [enemy] = entities.filter((entity) =>
        isRadius(entity.getPositions(), center, radius)
      );

      // TODO: временное решение
      if (enemy && tower.getActive()) {
        enemy.damage(tower.getDamage());
        tower.setActive(false);
        setTimeout(() => tower.setActive(true), 1000);
      }
    });
  };

  protected isFreeSpace = ({ x, y }: Position): boolean =>
    !this.places.some(({ position }) => position.x === x && position.y === y);

  protected isFreeGrid = ({ x, y }: Position): boolean | never => {
    if (!this.size || !this.grid) {
      throw new GameError('Ожидается значение для size и grid');
    }

    const cell = Math.floor(x / this.size);
    const row = Math.floor(y / this.size);

    return this.grid && this.grid[row] && this.grid[row][cell] === 0;
  };
}
