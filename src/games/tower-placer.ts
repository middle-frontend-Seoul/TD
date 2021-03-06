import { towerManager } from 'games/managers/tower-manager';
import { GameStats } from 'games/game-stats';
import { Renderable } from 'games/interfaces/renderable';
import { EventBus, EventNames } from 'games/event-bus';
import { Tower } from 'games/towers/tower';
import { GameTowers } from 'games/towers/towers';
import { GridPosition } from 'games/typing';
import { Cursor } from 'games/cursor';
import { GameMap } from 'games/game-map';

export class TowerPlacer extends Renderable {
  protected eventBus: EventBus;

  private cursor: Cursor;

  private map: GameMap;

  private TowerClass: GameTowers | undefined;

  private tower: Tower | undefined;

  private isPlacing = false;

  private shouldBeDrawn = false;

  private gridPosition: GridPosition = { x: 0, y: 0 };

  private gameStats: GameStats;

  constructor(cursor: Cursor, map: GameMap, gameStats: GameStats) {
    super();
    this.eventBus = new EventBus();

    this.cursor = cursor;
    this.map = map;
    this.gameStats = gameStats;

    this.eventBus.on(EventNames.Escape, () => {
      if (this.isPlacing) {
        this.isPlacing = false;
      }
    });
    this.eventBus.on(EventNames.ClickInCanvas, () => {
      if (
        this.tower &&
        this.TowerClass &&
        this.isPlacing &&
        this.canBePlaced()
      ) {
        if (gameStats.canWithdraw(this.tower.price)) {
          this.gameStats.withdraw(this.tower.price);
          this.map.addElement(this.gridPosition);
          const tileSize = this.map.getTileSize();
          towerManager.add(new this.TowerClass(this.gridPosition, tileSize));
        }
      }
    });
  }

  update() {
    if (this.tower && this.isPlacing) {
      this.shouldBeDrawn = false;
      const tileSize = this.map.getTileSize();

      this.gridPosition = {
        x: Math.floor(this.cursor.boundMousePosition.x / tileSize),
        y: Math.floor(this.cursor.boundMousePosition.y / tileSize),
      };

      if (this.isMouseOverGrid()) {
        this.tower.setCoordinates(this.gridPosition);
        this.shouldBeDrawn = true;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.tower && this.isPlacing && this.shouldBeDrawn) {
      this.tower.draw(ctx, this.map);
      this.tower.drawRadius(ctx, this.map);

      if (!this.canBePlaced()) {
        const { x, y } = this.tower.position;
        const tileSize = this.map.getTileSize();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x + tileSize / 2 - 10, y + tileSize / 2 - 10);
        ctx.lineTo(x + tileSize / 2 + 10, y + tileSize / 2 + 10);
        ctx.moveTo(x + tileSize / 2 + 10, y + tileSize / 2 - 10);
        ctx.lineTo(x + tileSize / 2 - 10, y + tileSize / 2 + 10);
        ctx.stroke();
      }
    }
  }

  isMouseOverGrid() {
    return this.cursor.isMouseInCanvas;
  }

  canBePlaced() {
    return this.isMouseOverGrid() && this.map.canBePlaced(this.gridPosition);
  }

  place(TowerClass: GameTowers) {
    this.TowerClass = TowerClass;
    this.tower = new TowerClass({ x: 0, y: 0 }, this.map.getTileSize());
    this.shouldBeDrawn = false;
    this.isPlacing = true;
  }
}
