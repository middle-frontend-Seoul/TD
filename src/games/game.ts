import { Canvas } from './canvas';
import { GameMap, GridType } from './game-map';

export class Game {
  width: number;

  height: number;

  canvas: Canvas;

  map: GameMap;

  constructor(canvas: HTMLCanvasElement, grid: GridType[], size = 30) {
    this.height = grid.length;
    this.width = grid[0].length;

    this.map = new GameMap(grid, size);
    this.canvas = new Canvas(canvas);
  }

  start = async (): Promise<void> => {
    await this.map.load();
    this.draw();
  };

  draw = (): void => {
    const ctx = this.canvas.getCtx();
    this.canvas.clear();
    this.map.drawGrid(ctx);
  };
}
