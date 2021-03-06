import { EventBus, EventNames } from './event-bus';
import { Canvas } from './canvas';
import { Position } from './typing';

export class Cursor {
  eventBus: EventBus;

  canvas: Canvas;

  boundMousePosition: Position = { x: 0, y: 0 };

  isMouseInCanvas = false;

  constructor(canvas: Canvas) {
    this.eventBus = new EventBus();

    this.canvas = canvas;

    window.addEventListener('click', this.onClick);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('mousemove', this.onMouseMove);

    const element = this.canvas.getCanvas();
    element.addEventListener('mouseenter', this.onMouseMoveInCanvas);
    element.addEventListener('mouseleave', this.onMouseMoveOutCanvas);
  }

  removeEventListener = (): void => {
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('mousemove', this.onMouseMove);

    const element = this.canvas.getCanvas();
    element.removeEventListener('mouseenter', this.onMouseMoveInCanvas);
    element.removeEventListener('mouseleave', this.onMouseMoveOutCanvas);
  };

  private onClick = (event: MouseEvent): void => {
    if (this.isMouseInCanvas) {
      this.eventBus.emit(
        EventNames.ClickInCanvas,
        this.getBoundMousePosition(event)
      );
    }
  };

  private onKeyDown = ({ key }: KeyboardEvent) => {
    if (key.toLocaleLowerCase() === 'escape') {
      this.eventBus.emit(EventNames.Escape);
    }
  };

  private onMouseMoveInCanvas = () => {
    this.isMouseInCanvas = true;
  };

  private onMouseMoveOutCanvas = () => {
    this.isMouseInCanvas = false;
  };

  private onMouseMove = (event: MouseEvent) => {
    this.boundMousePosition = this.getBoundMousePosition(event);
  };

  private getBoundMousePosition = ({ clientX, clientY }: MouseEvent) => {
    const { x: canvasX, y: canvasY } = this.canvas.getRect();
    return {
      x: clientX - canvasX,
      y: clientY - canvasY,
    };
  };
}
