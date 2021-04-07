import { Position } from '../typing';

export abstract class InterfaceMoveMap {
  protected position: Position;

  constructor(position: Position) {
    this.position = position;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}
