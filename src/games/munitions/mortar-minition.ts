import { GameMap } from 'games/game-map';
import { Munition } from './munition';
import { enemyManager } from '../managers/enemy-manager';

export class MortarMunition extends Munition {
  color = 'rgba(0, 0, 0, 0.8)';
  speed = 3;
  damageR = Math.floor(Math.random() * 300) + 100;
  protected radius = 10;
  protected angle = 0;

  draw(ctx: CanvasRenderingContext2D) {
    const tileSize = 30;
    const { x, y } = this.position;
    const targetX = this.target.position.x + tileSize / 2;
    const targetY = this.target.position.y + tileSize / 2;

    this.angle = Math.atan2(targetY - y, targetX - x);
    const nearEqualX = x >= targetX - this.speed && x <= targetX + this.speed;
    const nearEqualY = y >= targetY - this.speed && y <= targetY + this.speed;
    const radius = this.damageR + Math.floor(Math.random() * 100) - 100;
    if (nearEqualX && nearEqualY) {
      ctx.ellipse(
        this.position.x,
        this.position.y,
        radius,
        radius,
        0,
        0,
        Math.PI * 2
      );
      const coef = Math.floor(Math.random() * 60) - 60;
      const r = 191 + coef;
      const g = 94 + coef;
      const b = 0 + coef;
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.rect(this.position.x, this.position.y - 20, 2, 30);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.ellipse(
        this.position.x + 1,
        this.position.y,
        this.radius,
        this.radius,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
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
    const enemies = enemyManager.getEnemiesInRadius(
      this.position,
      this.damageR
    );
    enemies.forEach((enemy) => enemy.receiveDamage(this.emitter.damage));
  }
}
