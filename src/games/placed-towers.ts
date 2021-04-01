import { TowerType } from './towers';
import { GridType } from './typing';

type Positions = { x: number; y: number };

type PlaceType = {
  tower: TowerType;
  position: Positions;
};

export class PlacedTowers {
  static interface: PlacedTowers;

  private places: PlaceType[] = [];

  private size: number;

  private grid: GridType;

  constructor(size: number, grid: GridType) {
    this.size = size;
    this.grid = grid;

    if (PlacedTowers.interface) {
      return PlacedTowers.interface;
    }

    PlacedTowers.interface = this;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.places.forEach(({ tower, position: { x, y } }) => {
      const { image } = tower;
      if (image) {
        ctx.drawImage(image, x, y);
      }
    });
  }

  append(tower: TowerType, position: Positions): boolean {
    if (!this.isAppend(position)) {
      return false;
    }

    this.places.push({ tower, position });
    return true;
  }

  getPlacedTowers(): PlaceType[] {
    return this.places;
  }

  private isAppend = (position: Positions): boolean => {
    const gridRow = Math.floor(position.y / this.size);
    const gridCol = Math.floor(position.x / this.size);

    // запрешаем устанавливать башню на тропе
    if (
      !this.grid ||
      this.grid[gridRow] === undefined ||
      this.grid[gridRow][gridCol] === undefined ||
      this.grid[gridRow][gridCol]
    ) {
      return false;
    }

    const isTower = this.places.some(
      ({ position: { x, y } }) => x === position.x && y === position.y
    );

    if (isTower) {
      return false;
    }

    return true;
  };
}
