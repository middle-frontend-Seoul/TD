import { Canvas } from './canvas';
import { GameMap } from './game-map';
import { GameError } from './game-error';
import { GridType } from './typing';

export class Game {
  canvas: Canvas;

  map: GameMap;

  constructor(canvas: HTMLCanvasElement, grid: GridType, size = 30) {
    this.map = new GameMap(grid, size);
    this.canvas = new Canvas(canvas);
  }

  start = async (): Promise<void> => {
    try {
      await this.map.init();
      this.draw();
    } catch (error) {
      throw new GameError('При старте игры возникла ошибка', error);
    }
  };

  draw = (): void => {
    const ctx = this.canvas.getCtx();
    this.canvas.clear();
    this.map.drawGrid(ctx);
  };
}
