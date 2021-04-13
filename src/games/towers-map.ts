import { Tower } from './towers';
import { Enemy } from './enemies';
import { GameError } from './game-error';
import { Position, GridType } from './typing';

export type EnemyRect = {
  enemy: Enemy;
  distance: number;
  isRadius: boolean;
};

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
   * Метод при каждом рендеринге (обновлении)
   * - проверяет наличие врагов в радиусе поражения башни
   * - проверяет готовность каждой башни к выстрегу
   * - врагу получившему урон обновляет значение здоровья
   */
  public update = (entities: Enemy[]): void => {
    const fiftySize = Math.floor(this.size / 2);

    this.places
      .filter(({ tower }) => tower.getActive())
      .forEach(({ tower, position }) => {
        const radius = tower.getRaduis() * this.size;
        const center: Position = {
          x: position.x + fiftySize,
          y: position.y + fiftySize,
        };

        const [first] = entities
          .map<EnemyRect>((enemy) => {
            const { x, y } = enemy.getPositions();
            const enemyX = x + fiftySize;
            const enemyY = y + fiftySize;

            const distance =
              (center.x - enemyX) ** 2 + (center.y - enemyY) ** 2;

            return {
              enemy,
              distance,
              isRadius: distance < radius ** 2,
            };
          })
          .filter(({ isRadius }) => isRadius)
          .sort((a, b) => a.distance - b.distance);

        this.shoot(tower, first);
      });
  };

  protected shoot = (tower: Tower, enemyRect?: EnemyRect): void => {
    if (!tower.getActive() || !enemyRect) return;
    const { enemy } = enemyRect;

    tower.setActive(false);
    enemy.damage(tower.getDamage());
    setTimeout(() => tower.setActive(true), tower.getReloadTime());
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
