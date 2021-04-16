import bg from 'images/bg-play.png';
import way from 'images/way-play.png';

import { GameError } from './game-error';
import { GridType } from './typing';
import { getGridSize, loadImage } from './helpers';

export class GameMap {
  private size: number;

  private width: number;

  private height: number;

  private grid: GridType;

  private imgBG?: HTMLImageElement;

  private imgWay?: HTMLImageElement;

  constructor(grid: GridType, size = 30) {
    const { width, height } = getGridSize(grid);

    this.size = size;
    this.grid = grid;
    this.width = width;
    this.height = height;
  }

  async init(): Promise<void> {
    try {
      this.imgBG = await loadImage(bg);
      this.imgWay = await loadImage(way);
    } catch (error) {
      throw new GameError('Ошибка загрузки изображения', error);
    }
  }

  drawGrid(ctx: CanvasRenderingContext2D): void {
    if (!this.imgWay || !this.imgBG) {
      return;
    }

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        let image = this.imgBG;
        if (this.grid[y] && this.grid[y][x]) {
          image = this.imgWay;
        }

        ctx.drawImage(
          image,
          x * this.size,
          y * this.size,
          this.size,
          this.size
        );
      }
    }
  }
}
