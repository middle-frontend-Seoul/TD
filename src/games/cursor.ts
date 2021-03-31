import { EventBus } from './event-bus';
import { Canvas } from './canvas';

export class Cursor {
  static instance: Cursor;

  size: number;

  event: () => EventBus;

  canvas: Canvas;

  mouse = { x: 0, y: 0 };

  position = { x: -1, y: -1 };

  mouseInCanvas = false;

  constructor(canvas: Canvas, size: number) {
    const event = new EventBus();

    this.size = size;
    this.canvas = canvas;
    this.event = () => event;

    if (Cursor.instance) {
      return Cursor.instance;
    }

    window.addEventListener('click', this.click);
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('mousemove', this.mousemove);

    const element = this.canvas.getCanvas();
    element.addEventListener('mouseenter', this.mouseMoveInCanvas);
    element.addEventListener('mouseleave', this.mouseMoveOutCanvas);

    Cursor.instance = this;
  }

  removeEventListener = (): void => {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('mousemove', this.mousemove);

    const element = this.canvas.getCanvas();
    element.removeEventListener('mouseenter', this.mouseMoveInCanvas);
    element.removeEventListener('mouseleave', this.mouseMoveOutCanvas);
  };

  private click = (event: MouseEvent): void => {
    this.event().emit('click', { mouseInCanvas: this.mouseInCanvas, event });
  };

  private keydown = ({ key }: KeyboardEvent) => {
    this.event().emit(`keydown:${key.toLocaleLowerCase()}`);
  };

  private mouseMoveInCanvas = () => {
    this.mouseInCanvas = true;
  };

  private mouseMoveOutCanvas = () => {
    this.mouseInCanvas = false;
  };

  private mousemove = ({ clientX, clientY }: MouseEvent) => {
    const { x: canvasX, y: canvasY } = this.canvas.getRect();
    this.mouse = { x: clientX, y: clientY };
    this.position = {
      y: Math.floor((clientX - canvasX) / this.size),
      x: Math.floor((clientY - canvasY) / this.size),
    };

    if (this.mouseInCanvas) {
      this.event().emit('mousemove:incanvas', this.position);
    } else {
      this.event().emit('mousemove:outcanvas', this.mouse);
    }
  };
}
