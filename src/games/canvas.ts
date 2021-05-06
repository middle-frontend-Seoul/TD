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

    window.addEventListener('resize', this.updateRect);
    window.addEventListener('scroll', this.updateRect);
  }

  removeEvent = (): void => {
    window.removeEventListener('resize', this.updateRect);
    window.removeEventListener('scroll', this.updateRect);
  };

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

  protected updateRect = (): void => {
    this.rect = this.canvas.getBoundingClientRect();
  };
}
