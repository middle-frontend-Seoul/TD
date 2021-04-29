import { towerManager } from 'games/managers/tower-manager';
import { Renderable } from 'games/interfaces/renderable';
import { EventBus, EventNames } from 'games/event-bus';
import { Tower } from 'games/towers/tower';
import { GameTowers } from 'games/towers/towers';
import { GridPosition } from 'games/typing';
import { Cursor } from 'games/cursor';
import { GameMap } from 'games/game-map';

export class TowerPlacer extends Renderable {
  private cursor: Cursor;

  private map: GameMap;

  private TowerClass: GameTowers | undefined;

  private tower: Tower | undefined;

  private isPlacing = false;

  private shouldBeDrawn = false;

  private gridPosition: GridPosition = { x: 0, y: 0 };

  protected event: () => EventBus;

  constructor(cursor: Cursor, map: GameMap) {
    super();
    const event = new EventBus();

    this.cursor = cursor;
    this.map = map;

    this.event = () => event;

    this.event().on(EventNames.escape, () => {
      if (this.isPlacing) {
        this.isPlacing = false;
      }
    });
    this.event().on(EventNames.clickInCanvas, () => {
      if (
        this.tower &&
        this.TowerClass &&
        this.isPlacing &&
        this.canBePlaced()
      ) {
        this.map.addElement(this.gridPosition);
        const tileSize = this.map.getTileSize();
        const newPosition = {
          x: this.gridPosition.x * tileSize,
          y: this.gridPosition.y * tileSize,
        };
        towerManager.add(new this.TowerClass(newPosition));
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
        const newPosition = {
          x: this.gridPosition.x * tileSize,
          y: this.gridPosition.y * tileSize,
        };
        this.tower.setPosition(newPosition);
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
    this.tower = new TowerClass();
    this.shouldBeDrawn = false;
    this.isPlacing = true;
  }
}
