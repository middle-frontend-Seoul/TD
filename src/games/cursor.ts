import { EventBus, EventNames } from './event-bus';
import { Canvas } from './canvas';
import { Position } from './typing';

export class Cursor {
  size: number;

  event: () => EventBus;

  canvas: Canvas;

  mouse = { x: 0, y: 0 };

  position: Position = { x: -1, y: -1 };

  isMouseInCanvas = false;

  constructor(canvas: Canvas, size: number) {
    const event = new EventBus();

    this.size = size;
    this.canvas = canvas;
    this.event = () => event;

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
      this.event().emit(EventNames.clickInCanvas, this.getPosition(event));
    }
  };

  private onKeyDown = ({ key }: KeyboardEvent) => {
    if (key.toLocaleLowerCase() === 'escape') {
      this.event().emit(EventNames.escape);
    }
  };

  private onMouseMoveInCanvas = () => {
    this.isMouseInCanvas = true;
  };

  private onMouseMoveOutCanvas = () => {
    this.isMouseInCanvas = false;
  };

  private onMouseMove = (event: MouseEvent) => {
    this.mouse = { x: event.clientX, y: event.clientY };
    this.position = this.getPosition(event);

    if (this.isMouseInCanvas) {
      this.event().emit(EventNames.moveInCanvas, this.position);
    } else {
      this.event().emit(EventNames.moveOutCanvas, this.mouse);
    }
  };

  private getPosition = ({ clientX, clientY }: MouseEvent) => {
    const { x: canvasX, y: canvasY } = this.canvas.getRect();
    return {
      x: Math.floor((clientX - canvasX) / this.size) * this.size,
      y: Math.floor((clientY - canvasY) / this.size) * this.size,
    };
  };
}
