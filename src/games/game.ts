import { enemyManager } from 'games/managers/enemy-manager';
import { towerManager } from 'games/managers/tower-manager';
import { munitionManager } from 'games/managers/munition-manager';
import { Canvas } from 'games/canvas';
import { GameMap } from 'games/game-map';
import { Cursor } from 'games/cursor';
import { GridType } from 'games/typing';
import { TowerPlacer } from 'games/tower-placer';
import { SimpleEnemy } from 'games/enemies';

export class Game {
  private ticker: number;
  private lastTime: number;

  private map: GameMap;

  private towerPlacer: TowerPlacer;

  private canvas: Canvas;

  private cursor: Cursor;

  private onGameEnded: () => void;

  constructor(
    canvas: HTMLCanvasElement,
    grid: GridType,
    onGameEnded: () => void,
    tileSize: number
  ) {
    this.ticker = -1;
    this.lastTime = 0;
    this.onGameEnded = onGameEnded;

    const boundGameOver = this.gameOver.bind(this);
    this.map = new GameMap(grid, boundGameOver, tileSize);
    this.canvas = new Canvas(canvas);
    this.cursor = new Cursor(this.canvas);
    this.towerPlacer = new TowerPlacer(this.cursor, this.map);
  }

  public init(): void {
    this.map.init();
    setTimeout(this.addEnemy, 2000); // времмено дабавляем врагов для демонстрации работы
    setTimeout(this.addEnemy, 4000); // времмено дабавляем врагов для демонстрации работы
    setTimeout(this.addEnemy, 6000); // времмено дабавляем врагов для демонстрации работы
  }

  public start(): boolean {
    this.ticker = requestAnimationFrame(this.animation.bind(this));
    return true;
  }

  public pause(): boolean {
    cancelAnimationFrame(this.ticker);
    this.ticker = -1;
    return true;
  }

  public gameOver(): void {
    cancelAnimationFrame(this.ticker);
    this.ticker = -1;
    this.onGameEnded();
  }

  public animation(): void {
    this.fps();
    this.update();
    this.draw();
    if (this.ticker !== -1) {
      this.ticker = requestAnimationFrame(this.animation.bind(this));
    }
  }

  private addEnemy = (): void => {
    const position = { ...this.map.getStartPosition() };
    const enemy = new SimpleEnemy(position);
    enemyManager.add(enemy);
  };

  private fps = (): void => {
    if (!this.lastTime) {
      this.lastTime = performance.now();
    } else {
      // const fps = 1000 / (performance.now() - this.lastTime);
      // console.log(fps);
      this.lastTime = 0;
    }
  };

  private update = (): void => {
    this.map.update();
    munitionManager.update(this.map);
    enemyManager.update(this.map);
    towerManager.update(this.map);
    this.towerPlacer.update();
  };

  private draw = (): void => {
    const ctx = this.canvas.getCtx();
    this.canvas.clear();

    this.map.drawGrid(ctx);
    munitionManager.draw(ctx, this.map);
    enemyManager.draw(ctx, this.map);
    towerManager.draw(ctx, this.map);
    this.towerPlacer.draw(ctx);
  };

  public getTowerPlacer(): TowerPlacer {
    return this.towerPlacer;
  }
}
