import { Enemy } from './enemy';
import { Position } from '../typing';

export class StrongEnemy extends Enemy {
  constructor(position: Position) {
    super({
      name: 'strong',
      size: 30,
      live: 180,
      livesLeft: 180,
      speed: 0.8,
      position,
      damage: 2,
    });
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    if (this.livesLeft !== this.live) {
      this.drawLive(ctx);
    }

    const fifty = this.size / 2;

    const x = this.position.x + fifty;
    const y = this.position.y + fifty;

    ctx.beginPath();
    ctx.fillStyle = '#8FEC34';
    ctx.rect(x - 12, y - 7, 24, 14);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#8FEC34';
    ctx.rect(x - 7, y - 12, 14, 24);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FFF500';
    ctx.rect(x - 7, y - 7, 14, 14);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.rect(x - 2, y - 7, 4, 14);
    ctx.fill();
  };
}
