import { Canvas } from './canvas';
import { GameMap } from './game-map';
import { GameError } from './game-error';
// import { MoveTower } from './move-tower';
// import { PlacedTowers } from './placed-towers';
import { Cursor } from './cursor';
import { GridType } from './typing';

export class Game {
  private map: GameMap;

  private canvas: Canvas;

  private cursor: Cursor;

  // private moveTower: MoveTower;

  // private placedTowers: PlacedTowers;

  constructor(canvas: HTMLCanvasElement, grid: GridType, size = 30) {
    this.map = new GameMap(grid, size);
    this.canvas = new Canvas(canvas);
    this.cursor = new Cursor(this.canvas, size);
    // this.moveTower = new MoveTower(size, grid);
    // this.placedTowers = new PlacedTowers(size, grid);
  }

  public start = async (): Promise<void> => {
    try {
      await this.map.init();
      this.animation();
    } catch (error) {
      throw new GameError('При старте игры возникла ошибка', error);
    }
  };

  public animation(): void {
    this.draw();
    requestAnimationFrame(this.animation.bind(this));
  }

  public getCursor(): Cursor {
    return this.cursor;
  }

  private draw = (): void => {
    const ctx = this.canvas.getCtx();
    this.canvas.clear();
    this.map.drawGrid(ctx);

    // this.moveTower.draw(ctx);
    // this.placedTowers.draw(ctx);
  };
}
