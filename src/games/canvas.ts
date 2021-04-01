export class Canvas {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (this.ctx === null) {
      throw new Error('Не удалось получить контекст');
    }
  }

  getCtx(): CanvasRenderingContext2D {
    return this.ctx;
  }

  clear(): void {
    this.ctx.fillStyle = '#2ea44f';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
