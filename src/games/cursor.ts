import { EventBus, EventNames } from './event-bus';
import { Canvas } from './canvas';
import { Position } from './typing';

export class Cursor {
  size: number;

  event: () => EventBus;

  canvas: Canvas;

  mouse = { x: 0, y: 0 };

  position: Position = { x: -1, y: -1 };

  mouseInCanvas = false;

  constructor(canvas: Canvas, size: number) {
    const event = new EventBus();

    this.size = size;
    this.canvas = canvas;
    this.event = () => event;

    window.addEventListener('click', this.click);
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('mousemove', this.mousemove);

    const element = this.canvas.getCanvas();
    element.addEventListener('mouseenter', this.mouseMoveInCanvas);
    element.addEventListener('mouseleave', this.mouseMoveOutCanvas);
  }

  removeEventListener = (): void => {
    window.removeEventListener('click', this.click);
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('mousemove', this.mousemove);

    const element = this.canvas.getCanvas();
    element.removeEventListener('mouseenter', this.mouseMoveInCanvas);
    element.removeEventListener('mouseleave', this.mouseMoveOutCanvas);
  };

  private click = (event: MouseEvent): void => {
    if (this.mouseInCanvas) {
      this.event().emit(EventNames.clickInCanvas, this.getPosition(event));
    }
  };

  private keydown = ({ key }: KeyboardEvent) => {
    if (key.toLocaleLowerCase() === 'escape') {
      this.event().emit(EventNames.escape);
    }
  };

  private mouseMoveInCanvas = () => {
    this.mouseInCanvas = true;
  };

  private mouseMoveOutCanvas = () => {
    this.mouseInCanvas = false;
  };

  private mousemove = (event: MouseEvent) => {
    this.mouse = { x: event.clientX, y: event.clientY };
    this.position = this.getPosition(event);

    if (this.mouseInCanvas) {
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
