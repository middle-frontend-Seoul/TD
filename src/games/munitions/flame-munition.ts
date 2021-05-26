import { GameMap } from 'games/game-map';
import { Munition } from './munition';

export class FlameMunition extends Munition {
  color = 'rgba(191, 94, 0, 1)';
  speed = 6;
  protected radius = 3;
  protected angle = 0;
  num = 0;

  draw(ctx: CanvasRenderingContext2D) {
    this.num += 1;
    const coef = Math.floor(Math.random() * 60) - 60;
    const r = 191 + coef;
    const g = 94 + coef;
    const b = 0 + coef;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
    ctx.beginPath();
    ctx.ellipse(
      this.position.x,
      this.position.y,
      this.radius + this.num,
      this.radius + this.num,
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
