import { Enemy } from './enemy';

export class SimpleEnemy extends Enemy<SimpleEnemy> {
  name = 'simple';

  live = 100;

  livesLeft = 100;

  speed = 10;

  sizeBox = 4;

  width = 16;

  draw = (ctx: CanvasRenderingContext2D): void => {
    if (this.livesLeft !== this.live) {
      this.drawLive(ctx);
    }

    this.drawBox(ctx, 3, 3, '#000000');
    this.drawBox(ctx, 3, 2, '#FFF500');
    this.drawBox(ctx, 3, 4, '#FFF500');
    this.drawBox(ctx, 4, 3, '#FFF500');
    this.drawBox(ctx, 2, 3, '#FFF500');
    this.drawBox(ctx, 2, 2, '#E527DD');
    this.drawBox(ctx, 4, 2, '#E527DD');
    this.drawBox(ctx, 2, 4, '#E527DD');
    this.drawBox(ctx, 4, 4, '#E527DD');
    this.drawBox(ctx, 1, 3, '#E527DD');
    this.drawBox(ctx, 5, 3, '#E527DD');
    this.drawBox(ctx, 3, 1, '#E527DD');
    this.drawBox(ctx, 3, 5, '#E527DD');
  };

  private drawBox = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string
  ): void => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(
      this.x + x * this.sizeBox + 1,
      this.y + y * this.sizeBox + 1,
      this.sizeBox,
      this.sizeBox
    );
    ctx.fill();
  };
}
