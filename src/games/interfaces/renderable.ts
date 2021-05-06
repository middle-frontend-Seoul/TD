import { Position } from 'games/typing';
import { GameMap } from 'games/game-map';

export abstract class Renderable {
  public position: Position;

  constructor(position: Position = { x: 0, y: 0 }) {
    this.position = position;
  }

  public abstract update(map: GameMap): void;

  public abstract draw(ctx: CanvasRenderingContext2D, map: GameMap): void;

  setPosition(position: Position) {
    this.position = position;
  }

  setPositionX(x: number) {
    this.position.x = x;
  }

  setPositionY(y: number) {
    this.position.y = y;
  }
}
