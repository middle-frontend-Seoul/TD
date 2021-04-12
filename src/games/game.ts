import { MoveCursor } from './move-cursor';
import { Canvas } from './canvas';
import { GameMap } from './game-map';
import { GameError } from './game-error';
import { Cursor } from './cursor';
import { GridType } from './typing';
import { TowersMap } from './towers-map';
import { TowersBuilder } from './towers-builder';

export class Game {
  private map: GameMap;

  private towersMap: TowersMap;

  private towersBuilder: TowersBuilder;

  private moveCursor: MoveCursor;

  private canvas: Canvas;

  private cursor: Cursor;

  constructor(canvas: HTMLCanvasElement, grid: GridType, size = 30) {
    this.map = new GameMap(grid, size);
    this.moveCursor = new MoveCursor();
    this.canvas = new Canvas(canvas);
    this.cursor = new Cursor(this.canvas, size);
    this.towersMap = new TowersMap(grid, size);
    this.towersBuilder = new TowersBuilder(this.towersMap, this.moveCursor);
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

  private draw = (): void => {
    const ctx = this.canvas.getCtx();
    this.canvas.clear();
    this.map.drawGrid(ctx);
    this.moveCursor.draw(ctx);
    this.towersMap.draw(ctx);
  };

  public getCursor(): Cursor {
    return this.cursor;
  }

  public getTowersBuilder(): TowersBuilder {
    return this.towersBuilder;
  }
}
