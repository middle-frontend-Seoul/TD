import { EventBus } from './event-bus';
import { Canvas } from './canvas';

export class Cursor {
  static instance: Cursor;

  size: number;

  event: () => EventBus;

  canvas: Canvas;

  mouse = { x: 0, y: 0 };

  position = { x: -1, y: -1 };

  constructor(canvas: Canvas, size: number) {
    const event = new EventBus();

    this.size = size;
    this.canvas = canvas;
    this.event = () => event;

    if (Cursor.instance) {
      return Cursor.instance;
    }

    window.addEventListener('keydown', this.keydown);
    window.addEventListener('mousemove', this.mousemove);

    Cursor.instance = this;
  }

  remove = (): void => {
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('mousemove', this.mousemove);
  };

  private keydown = ({ key }: KeyboardEvent) => {
    this.event().emit(`keydown:${key.toLocaleLowerCase()}`);
  };

  private mousemove = ({ clientX, clientY }: MouseEvent) => {
    const { x: canvasX, y: canvasY, height, width } = this.canvas.getRect();
    this.mouse = { x: clientX, y: clientY };
    this.position = {
      y: Math.floor((clientX - canvasX) / this.size),
      x: Math.floor((clientY - canvasY) / this.size),
    };

    const { x, y } = this.position;
    if (
      x >= 0 &&
      y >= 0 &&
      width >= clientX - canvasX &&
      height >= clientY - canvasY
    ) {
      this.event().emit('mousemove', this.position);
    }
  };
}
