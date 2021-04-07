import { MoveCursor } from './move-cursor';
import { MoveMap } from './move-map';
import { Canvas } from './canvas';
import { GameMap } from './game-map';
import { GameError } from './game-error';
import { Cursor } from './cursor';
import { GridType } from './typing';
import { TowersMap } from './towers-map';
import { TowersBuilder } from './towers-builder';
import { Enemy, SimpleEnemy } from './enemies';
import { getStartPosition } from './helpers';

export class Game {
  private grid: GridType;

  private size: number;

  private map: GameMap;

  private towersMap: TowersMap;

  private towersBuilder: TowersBuilder;

  private moveCursor: MoveCursor;

  private moveMap: MoveMap<Enemy>;

  private canvas: Canvas;

  private cursor: Cursor;

  constructor(canvas: HTMLCanvasElement, grid: GridType, size = 30) {
    this.grid = grid;
    this.size = size;

    this.map = new GameMap(grid, size);
    this.canvas = new Canvas(canvas);
    this.cursor = new Cursor(this.canvas, size);

    this.moveMap = new MoveMap();
    this.moveCursor = new MoveCursor();

    this.towersMap = new TowersMap(grid, size);
    this.towersBuilder = new TowersBuilder(this.towersMap, this.moveCursor);
  }

  public start = async (): Promise<void> => {
    try {
      await this.map.init();
      this.addEnemy();
      this.animation();
    } catch (error) {
      throw new GameError('При старте игры возникла ошибка', error);
    }
  };

  public animation(): void {
    this.draw();
    requestAnimationFrame(this.animation.bind(this));
  }

  private addEnemy = () => {
    const position = getStartPosition(this.grid, this.size);
    const enemy = new SimpleEnemy(position);
    this.moveMap.push(enemy);
  };

  private draw = (): void => {
    const ctx = this.canvas.getCtx();
    this.canvas.clear();
    this.map.drawGrid(ctx);
    this.moveMap.draw(ctx);
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
