import { enemyManager } from 'games/managers/enemy-manager';
import { GameMap } from 'games/game-map';
import { GridRenderable } from 'games/interfaces/grid-renderable';
import { Enemy } from 'games/enemies';
import { getDistanceSquared } from 'games/helpers';

export abstract class Tower extends GridRenderable {
  abstract pathImage: string;

  abstract name: string;

  abstract price: number;

  abstract color: string;

  abstract radius: number;

  abstract damage: number;

  abstract reloadTime: number;

  protected target: Enemy | undefined;

  protected lastShoot = 0;

  protected canShoot = true;

  // TODO extends GridRenderable и поддержку isHovered, center и тд

  public update(map: GameMap) {
    if (this.lastShoot + this.reloadTime < performance.now()) {
      this.canShoot = true;
      this.lastShoot = performance.now();
    }

    this.updateHelper(map);
  }

  protected updateHelper(map: GameMap) {
    const tileSize = map.getTileSize();
    const aimRadius = this.radius * tileSize;

    if (this.name === 'Лазер' && this.canShoot) {
      const enemies = enemyManager.getEnemiesOnLane(this);
      if (enemies) {
        enemies.forEach((enemy) => {
          this.canShoot = false;
          enemy.receiveDamage(1);
        });
      }
      return;
    }

    if (this.target && !this.target.isAlive) {
      this.target = undefined;
    } else if (
      this.target &&
      getDistanceSquared(this.center, this.target.position) <
        aimRadius * aimRadius
    ) {
      if (this.canShoot) {
        this.canShoot = false;
        this.shoot();
      }
    } else {
      this.target = enemyManager.getClosestPointInRadius(
        this.center,
        aimRadius
      );
    }
  }

  public drawRadius(ctx: CanvasRenderingContext2D, map: GameMap) {
    const tileSize = map.getTileSize();
    const aimRadius = this.radius * tileSize;
    const { x, y } = this.center;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillStyle = this.color;
    ctx.arc(x, y, aimRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  protected abstract shoot(): void;

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getDamage(): number {
    return this.damage;
  }
}
