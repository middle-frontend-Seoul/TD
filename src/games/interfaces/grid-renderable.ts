import { Renderable } from 'games/interfaces/renderable';
import { Position, GridPosition } from 'games/typing';
import { GameMap } from 'games/game-map';

export abstract class GridRenderable extends Renderable {
  public gridPosition: GridPosition;
  public width: number;
  public isHovered = false;
  public center: Position = { x: 0, y: 0 };
  protected halfWidth: number;
  protected top = 0;
  protected bottom = 0;
  protected right = 0;
  protected left = 0;

  constructor(gridPosition: GridPosition, width: number) {
    super();
    this.gridPosition = gridPosition;
    this.width = width;
    this.halfWidth = this.width / 2;
    this.setCoordinates(gridPosition);
  }

  public abstract update(map: GameMap): void;

  public abstract draw(ctx: CanvasRenderingContext2D, map: GameMap): void;

  setCoordinates(gridPosition: GridPosition) {
    const { x, y } = gridPosition;
    this.setPosition({
      x: x * this.width,
      y: y * this.width,
    });
    this.center = {
      x: this.position.x + this.halfWidth,
      y: this.position.y + this.halfWidth,
    };
    this.top = this.position.y;
    this.bottom = this.position.y + this.width;
    this.left = this.position.x;
    this.right = this.position.x + this.width;
  }
}
