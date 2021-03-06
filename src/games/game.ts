import { EventBus, EventNames } from 'games/event-bus';
import { enemyManager } from 'games/managers/enemy-manager';
import { towerManager } from 'games/managers/tower-manager';
import { munitionManager } from 'games/managers/munition-manager';
import { GameStats } from 'games/game-stats';
import { Canvas } from 'games/canvas';
import { GameMap } from 'games/game-map';
import { Cursor } from 'games/cursor';
import { GridType, GameUIAction, GameUIState } from 'games/typing';
import { TowerPlacer } from 'games/tower-placer';
import { WavesManager } from 'games/managers/waves-manager';
import { simpleThrottle } from 'utils/helpers';

export const initialUIState: GameUIState = {
  isGameEnded: false,
  fps: 0,
  score: 100,
  wave: 1,
  lives: 5,
};

export function uiReducer(state: GameUIState, action: GameUIAction) {
  switch (action.type) {
    case 'gameOver':
      return {
        ...state,
        isGameEnded: true,
      };

    case 'setFps':
      return {
        ...state,
        fps: Math.floor(action.payload),
      };

    case 'setScore':
      return {
        ...state,
        score: action.payload,
      };

    case 'setWave':
      return {
        ...state,
        wave: action.payload,
      };

    case 'setLives':
      return {
        ...state,
        lives: action.payload,
      };

    default:
      throw new Error('uiReducer - no such action type');
  }
}

export class Game {
  protected eventBus: EventBus;

  private ticker: number;

  private lastTime: number;

  private map: GameMap;

  private towerPlacer: TowerPlacer;

  private waveManager: WavesManager;

  private canvas: Canvas;

  private cursor: Cursor;

  private gameStats: GameStats;

  private setUIState: React.Dispatch<GameUIAction>;

  private throttledFpsUpdate: (fps: number) => void;

  constructor(
    canvas: HTMLCanvasElement,
    grid: GridType,
    setUIState: React.Dispatch<GameUIAction>,
    tileSize: number
  ) {
    this.eventBus = new EventBus();
    this.eventBus.clearAll();

    const clonedGrid = grid.map((row) => [...row]);

    this.ticker = -1;
    this.lastTime = 0;
    this.setUIState = setUIState;

    this.gameStats = new GameStats(initialUIState, setUIState);
    this.map = new GameMap(clonedGrid, tileSize);
    this.canvas = new Canvas(canvas);
    this.cursor = new Cursor(this.canvas);
    this.towerPlacer = new TowerPlacer(this.cursor, this.map, this.gameStats);

    this.init();
    this.waveManager = new WavesManager(this.map.getStartPosition());

    this.eventBus.on(EventNames.GameOver, () => {
      this.gameOver();
    });

    this.throttledFpsUpdate = simpleThrottle((fps: number) => {
      this.eventBus.emit(EventNames.FpsUpdated, fps);
    }, 1000);

    this.eventBus.on(EventNames.NewWave, (wave: number) => {
      this.setUIState({ type: 'setWave', payload: wave });
    });
  }

  public init(): void {
    this.map.init();
    munitionManager.init();
    enemyManager.init();
    towerManager.init();
  }

  public start(): boolean {
    this.waveManager.start();
    this.ticker = requestAnimationFrame(this.animation.bind(this));

    return true;
  }

  public pause(): boolean {
    cancelAnimationFrame(this.ticker);
    this.ticker = -1;
    this.waveManager.looping = false;
    return true;
  }

  public gameOver(): void {
    cancelAnimationFrame(this.ticker);
    this.ticker = -1;
    this.waveManager.looping = false;
    this.setUIState({ type: 'gameOver' });
  }

  public animation(): void {
    this.fps();
    this.update();
    this.draw();
    if (this.ticker !== -1) {
      this.ticker = requestAnimationFrame(this.animation.bind(this));
    }
  }

  private fps = (): void => {
    if (!this.lastTime) {
      this.lastTime = performance.now();
    } else {
      const fps = 1000 / (performance.now() - this.lastTime);
      this.lastTime = 0;
      this.throttledFpsUpdate(fps);
    }
  };

  private update = (): void => {
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
