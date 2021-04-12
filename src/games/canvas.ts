export class Canvas {
  private canvas: HTMLCanvasElement;

  private rect: DOMRect;

  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.rect = canvas.getBoundingClientRect();
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (this.ctx === null) {
      throw new Error('Не удалось получить контекст');
    }
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }

  getRect(): DOMRect {
    return this.rect;
  }

  clear(): void {
    this.ctx.fillStyle = '#2ea44f';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
