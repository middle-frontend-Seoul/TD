import { InterfaceMoveMap } from './interfaces/move-map';
import { GameError } from './game-error';
import { GridType } from './typing';

export class MoveMap<T extends InterfaceMoveMap> {
  protected size: number;

  protected grid: GridType;

  protected entities: T[] = [];

  constructor(grid: GridType, size: number) {
    this.grid = grid;
    this.size = size;
  }

  public push = (entity: T): void => {
    if (!(entity instanceof InterfaceMoveMap)) {
      throw new GameError(`${entity}: не экземпляр класса InterfaceMoveMap`);
    }

    this.entities.push(entity);
  };

  public draw = (ctx: CanvasRenderingContext2D): void => {
    this.entities.forEach((entity) => entity.draw(ctx));
  };

  public update = (): void => {
    const hashAntonymTrackway = {
      right: 'left',
      left: 'right',
      top: 'bottom',
      bottom: 'top',
    };

    this.entities.forEach((entity) => {
      const trackway = entity.getDirection();
      const { x, y } = entity.getPositions();

      const gridXLeftTopPoint = Math.floor(x / this.size);
      const gridYLeftTopPoint = Math.floor(y / this.size);

      const gridXRightBottomPoint = Math.floor((x + this.size - 1) / this.size);
      const gridYRightBottomPoint = Math.floor((y + this.size - 1) / this.size);

      const gridPosition = { x: gridXLeftTopPoint, y: gridYLeftTopPoint };

      const trackwayIsClear = {
        right: !!this.grid[gridPosition.y][gridPosition.x + 1],
        top: !!this.grid[gridPosition.y - 1][gridPosition.x],
        left: !!this.grid[gridPosition.y][gridPosition.x - 1],
        bottom: !!this.grid[gridPosition.y + 1][gridPosition.x],
      };

      const keys = Object.keys(trackwayIsClear);
      while (keys.length) {
        if (trackwayIsClear[trackway]) {
          break;
        }

        const key = keys.shift() as keyof typeof trackwayIsClear;
        const isClear = trackwayIsClear[key];

        if (
          isClear &&
          hashAntonymTrackway[trackway] !== key &&
          gridYLeftTopPoint === gridYRightBottomPoint &&
          gridXLeftTopPoint === gridXRightBottomPoint
        ) {
          entity.setDirection(key);
          break;
        }
      }

      // eslint-disable-next-line default-case
      switch (entity.getDirection()) {
        case 'top':
          entity.setPosition('y', y - entity.getSpeed());
          break;
        case 'left':
          entity.setPosition('x', x - entity.getSpeed());
          break;
        case 'right':
          entity.setPosition('x', x + entity.getSpeed());
          break;
        case 'bottom':
          entity.setPosition('y', y + entity.getSpeed());
          break;
      }
    });
  };
}
