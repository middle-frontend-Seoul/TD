import { GameMap } from 'games/game-map';
import { Munition } from './munition';

export class GunMunition extends Munition {
  color = 'rgba(255, 0, 0, 0.5)';
  speed = 8;
  protected radius = 3;
  protected angle = 0;

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(
      this.position.x,
      this.position.y,
      this.radius,
      this.radius,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  update(map: GameMap) {
    const tileSize = map.getTileSize();
    const { x, y } = this.position;
    const targetX = this.target.position.x + tileSize / 2;
    const targetY = this.target.position.y + tileSize / 2;

    this.angle = Math.atan2(targetY - y, targetX - x);
    const nearEqualX = x >= targetX - this.speed && x <= targetX + this.speed;
    const nearEqualY = y >= targetY - this.speed && y <= targetY + this.speed;

    this.setPosition({
      x: x + Math.cos(this.angle) * this.speed,
      y: y + Math.sin(this.angle) * this.speed,
    });

    if (nearEqualX && nearEqualY) {
      this.isAlive = false;
      if (this.target.isAlive) {
        this.dealDamage();
      }
    }
  }

  dealDamage() {
    this.target.receiveDamage(this.emitter.damage);
  }
}
