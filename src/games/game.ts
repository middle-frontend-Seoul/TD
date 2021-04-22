import { MoveCursor } from './move-cursor';
import { MoveMap } from './move-map';
import { Canvas } from './canvas';
import { GameMap } from './game-map';
import { Cursor } from './cursor';
import { GridType } from './typing';
import { TowersMap } from './towers-map';
import { TowersBuilder } from './towers-builder';
import { Enemy, SimpleEnemy } from './enemies';
import { getStartPosition } from './helpers';

const TARGET_FPS = 60;

export class Game {
  private ticker: number;

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
    this.ticker = -1;

    this.grid = grid;
    this.size = size;

    this.map = new GameMap(grid, size);
    this.canvas = new Canvas(canvas);
    this.cursor = new Cursor(this.canvas, size);

    this.moveMap = new MoveMap(grid, size);
    this.moveCursor = new MoveCursor();

    this.towersMap = new TowersMap(grid, size);
    this.towersBuilder = new TowersBuilder(this.towersMap, this.moveCursor);
  }

  public init(): void {
    this.addEnemy(); // времмено дабавляем врага для демонстрации работы
  }

  public start(): void {
    const boundAnimation = this.animation.bind(this);
    this.ticker = window.setInterval(
      () => requestAnimationFrame(boundAnimation),
      1000 / TARGET_FPS
    );
    boundAnimation();
  }

  public pause(): void {
    window.clearInterval(this.ticker);
  }

  public gameOver(): void {
    setTimeout(() => {
      window.clearInterval(this.ticker);
    }, 100);
  }

  public animation(): void {
    this.update();
    this.draw();
  }

  private addEnemy = (): void => {
    const position = getStartPosition(this.grid, this.size);
    const enemy = new SimpleEnemy(position);
    this.moveMap.push(enemy);
  };

  private update = (): void => {
    this.moveMap.update();
    this.towersMap.update(this.moveMap.getEntities());
  };

  private draw = (): void => {
    const ctx = this.canvas.getCtx();
    this.canvas.clear();
    this.map.drawGrid(ctx);
    this.towersMap.draw(ctx);
    this.moveMap.draw(ctx);
    this.moveCursor.draw(ctx);
  };

  public getCursor(): Cursor {
    return this.cursor;
  }

  public getTowersBuilder(): TowersBuilder {
    return this.towersBuilder;
  }
}
