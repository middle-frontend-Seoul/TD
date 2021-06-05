import { GameMap } from 'games/game-map';
import { Enemy } from './enemy';

export class StrongEnemy extends Enemy {
  protected name = 'strong';

  protected speed = 0.8;

  protected live = 180;

  protected damage = 2;

  protected cash = 7;

  protected sizeBox = 4;

  draw = (ctx: CanvasRenderingContext2D, map: GameMap): void => {
    super.draw(ctx, map);
    const tileSize = map.getTileSize();

    const fifty = tileSize / 2;

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
