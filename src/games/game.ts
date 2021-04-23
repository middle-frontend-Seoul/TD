import { MoveCursor } from './move-cursor';
import { MoveMap } from './move-map';
import { Canvas } from './canvas';
import { GameMap } from './maps/game-map';
import { Cursor } from './cursor';
import { GridType } from './typing';
import { TowersMap } from './towers-map';
import { TowersBuilder } from './towers-builder';
import { Enemy, SimpleEnemy } from './enemies';

export class Game {
  private ticker: number;

  private map: GameMap;

  private towersMap: TowersMap;

  private towersBuilder: TowersBuilder;

  private moveCursor: MoveCursor;

  private moveMap: MoveMap<Enemy>;

  private canvas: Canvas;

  private cursor: Cursor;

  private hp: number;
  private onGameEnded: () => void;

  constructor(
    canvas: HTMLCanvasElement,
    grid: GridType,
    onGameEnded: () => void,
    size = 30
  ) {
    this.ticker = -1;

    this.map = new GameMap(grid, size);
    this.canvas = new Canvas(canvas);
    this.cursor = new Cursor(this.canvas, size);

    this.moveMap = new MoveMap(grid, size);
    this.moveCursor = new MoveCursor();

    this.towersMap = new TowersMap(grid, size);
    this.towersBuilder = new TowersBuilder(this.towersMap, this.moveCursor);

    this.hp = 5;
    this.onGameEnded = onGameEnded;
  }

  public init(): void {
    this.map.init();
    setInterval(this.addEnemy, 1000); // времмено дабавляем врагов для демонстрации работы
  }

  public start(): boolean {
    this.ticker = requestAnimationFrame(this.animation.bind(this));
    return true;
  }

  public pause(): boolean {
    cancelAnimationFrame(this.ticker);
    return true;
  }

  public gameOver(): void {
    setTimeout(() => {
      cancelAnimationFrame(this.ticker);
    }, 100);
  }

  public animation(): void {
    this.update();
    this.draw();
    this.ticker = requestAnimationFrame(this.animation.bind(this));
  }

  private addEnemy = (): void => {
    const position = { ...this.map.getStartPosition() };
    const enemy = new SimpleEnemy(position);
    this.moveMap.push(enemy);
  };

  private update = (): void => {
    this.moveMap.update();
    this.towersMap.update(this.moveMap.getEntities());
    this.moveMap.getEntities().forEach((enemy, index) => {
      if (enemy.getPositions().x > this.map.getEndPosition().x) {
        this.hp -= enemy.getDamage();
        this.moveMap.remove(index);
        if (this.hp <= 0) {
          this.gameOver();
          this.onGameEnded();
        }
      }
    });
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
