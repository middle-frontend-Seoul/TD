// import { GridType } from './typing';

type Positions = { x: number; y: number };

type PlaceType = {
  position: Positions;
};

// проверка башни можно ли установить (в отдельный класс)
// TowersMap (координаты башни)

// фабрика TowersBuilder (события, ondrag)
export class PlacedTowers {
  static interface: PlacedTowers;

  private places: PlaceType[] = [];

  // private size: number;

  // private grid: GridType;

  constructor() {
    // this.size = size;
    // this.grid = grid;

    if (PlacedTowers.interface) {
      return PlacedTowers.interface;
    }

    PlacedTowers.interface = this;
  }

  // draw(ctx: CanvasRenderingContext2D): void {}

  // append(): boolean {}

  getPlacedTowers(): PlaceType[] {
    return this.places;
  }

  // private isAppend = (position: Positions): boolean => {
  //   const gridRow = Math.floor(position.y / this.size);
  //   const gridCol = Math.floor(position.x / this.size);

  //   // запрешаем устанавливать башню на тропе
  //   if (
  //     !this.grid ||
  //     this.grid[gridRow] === undefined ||
  //     this.grid[gridRow][gridCol] === undefined ||
  //     this.grid[gridRow][gridCol]
  //   ) {
  //     return false;
  //   }

  //   const isTower = this.places.some(
  //     ({ position: { x, y } }) => x === position.x && y === position.y
  //   );

  //   if (isTower) {
  //     return false;
  //   }

  //   return true;
  // };
}
