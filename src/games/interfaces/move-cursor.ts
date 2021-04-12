import { Position } from '../typing';

export abstract class InterfaceMoveCursor {
  abstract draw(ctx: CanvasRenderingContext2D, pos: Position): void;
  abstract drawRadius(ctx: CanvasRenderingContext2D, pos: Position): void;
}
