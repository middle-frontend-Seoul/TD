import { Position } from '../typing';

export type Axis = 'x' | 'y';

export type Direction = 'top' | 'left' | 'right' | 'bottom';

export abstract class InterfaceMoveMap {
  protected direction: Direction;

  protected speed: number;

  protected position: Position;

  constructor(position: Position) {
    this.speed = 1;
    this.position = position;
    this.direction = 'right';
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  abstract isLive(): boolean;

  public setPositions(position: Position): void {
    this.position = position;
  }

  public setPosition(axis: Axis, val: number): void {
    this.position[axis] = val;
  }

  public getPositions(): Position {
    return this.position;
  }

  public setDirection(direction: Direction): void {
    this.direction = direction;
  }

  public getDirection(): Direction {
    return this.direction;
  }

  public getSpeed(): number {
    return this.speed;
  }
}
