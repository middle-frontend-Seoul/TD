import { EventBus, EventNames } from './event-bus';
import { Position } from './typing';
import { InterfaceMoveCursor } from './interfaces';

export const ERROR_IS_NO_PLACE = 'IS NO PLACE';

export class MoveCursor {
  protected isMove = false;

  protected content: InterfaceMoveCursor | null;

  protected position: Position | null;

  protected event: () => EventBus;

  constructor() {
    const event = new EventBus();

    this.event = () => event;
    this.content = null;
    this.position = null;

    this.event().on(EventNames.moveOutCanvas, this.mousemoveOutCanvas);
    this.event().on(EventNames.moveInCanvas, this.mousemoveInCanvas);
  }

  public draw = (ctx: CanvasRenderingContext2D): void => {
    if (!this.isMove || !this.position || !this.content) return;

    if (typeof this.content.drawRadius === 'function') {
      this.content.drawRadius(ctx, this.position);
    }

    this.content.draw(ctx, this.position);
  };

  public onDrag = <T extends InterfaceMoveCursor>(content: T): void => {
    this.isMove = true;
    this.content = content;
  };

  public onDrop = (): void => {
    this.isMove = false;
    this.content = null;
  };

  getContext = (): unknown => {
    return this.content;
  };

  private mousemoveInCanvas = (position: Position): void => {
    if (!this.isMove) return;
    this.position = position;
  };

  private mousemoveOutCanvas = (): void => {
    this.position = null;
  };
}
