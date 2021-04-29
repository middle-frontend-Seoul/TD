import bg from 'images/bg-play.png';
import way from 'images/way-play.png';

import { GridType, Position, GridPosition } from 'games/typing';
import { getGridSize, getStartPosition, getEndPosition } from 'games/helpers';
import { GameError } from 'games/game-error';

export class GameMap {
  private tileSize: number;

  private width: number;

  private height: number;

  private grid: GridType;

  // TODO - добавить path (путь врагов, замена startPosition, endPosition)
  // private path: GridPosition[] = [];

  private imgBG: HTMLImageElement;

  private imgWay: HTMLImageElement;

  protected startPosition: Position;

  protected endPosition: Position;

  private hp = 5;
  private gameOver: () => void;

  constructor(grid: GridType, gameOver: () => void, tileSize = 30) {
    const { width, height } = getGridSize(grid);

    this.gameOver = gameOver;
    this.tileSize = tileSize;
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

  init(): void {
    try {
      // TODO this.path = getEnemyPath(this.grid);
      this.startPosition = getStartPosition(this.grid, this.tileSize);
      this.endPosition = getEndPosition(this.grid, this.tileSize);
    } catch (error) {
      throw new GameError('Ошибка расчёта карты');
    }
  }

  drawGrid(ctx: CanvasRenderingContext2D): void {
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        let image = this.imgBG;
        if (this.grid[y] && this.grid[y][x] === 1) {
          image = this.imgWay;
        }

        ctx.drawImage(
          image,
          x * this.tileSize,
          y * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }

  update() {
    if (this.hp <= 0) {
      this.gameOver();
    }
  }

  public handleDamage(damage: number) {
    this.hp -= damage;
  }

  public getStartPosition(): Position {
    return this.startPosition;
  }

  public getEndPosition(): Position {
    return this.endPosition;
  }

  public getTileSize(): number {
    return this.tileSize;
  }

  public getGrid(): GridType {
    return this.grid;
  }

  public addElement(gridPosition: GridPosition) {
    const { x, y } = gridPosition;
    if (this.grid && this.grid[y] && typeof this.grid[y][x] !== 'undefined') {
      this.grid[y][x] = 2;
    }
  }

  public canBePlaced = (gridPosition: GridPosition): boolean => {
    const { x, y } = gridPosition;
    return this.grid && this.grid[y] && this.grid[y][x] === 0;
  };
}
