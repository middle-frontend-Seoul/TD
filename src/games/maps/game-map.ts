import bg from 'images/bg-play.png';
import way from 'images/way-play.png';

import { GridType, Position } from 'games/typing';
import { getGridSize, getStartPosition, getEndPosition } from 'games/helpers';
import { GameError } from '../game-error';

export class GameMap {
  private size: number;

  private width: number;

  private height: number;

  private grid: GridType;

  private imgBG: HTMLImageElement;

  private imgWay: HTMLImageElement;

  protected startPosition: Position;

  protected endPosition: Position;

  constructor(grid: GridType, size = 30) {
    const { width, height } = getGridSize(grid);

    this.size = size;
    this.grid = grid;
    this.width = width;
    this.height = height;

    this.imgBG = new Image();
    this.imgWay = new Image();
    this.imgBG.src = bg;
    this.imgWay.src = way;

    this.startPosition = { x: 0, y: 0 };
    this.endPosition = { x: 0, y: 0 };
  }

  async init(): Promise<void> {
    try {
      this.startPosition = getStartPosition(this.grid, this.size);
      this.endPosition = getEndPosition(this.grid, this.size);
    } catch (error) {
      throw new GameError('Ошибка расчёта карты');
    }
  }

  drawGrid(ctx: CanvasRenderingContext2D): void {
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

  public getStartPosition(): Position {
    return this.startPosition;
  }

  public getEndPosition(): Position {
    return this.endPosition;
  }
}
