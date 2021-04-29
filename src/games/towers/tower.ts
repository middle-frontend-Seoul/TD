import { enemyManager } from 'games/managers/enemy-manager';
import { GameMap } from 'games/game-map';
import { Renderable } from 'games/interfaces/renderable';
import { Enemy } from 'games/enemies';
import { getDistanceSquared } from 'games/helpers';
import { Position } from 'games/typing';

export abstract class Tower extends Renderable {
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

    const tileSize = map.getTileSize();
    const aimRadius = this.radius * tileSize;
    const center: Position = {
      x: this.position.x + tileSize / 2,
      y: this.position.y + tileSize / 2,
    };

    if (this.target && !this.target.isAlive) {
      this.target = undefined;
    } else if (
      this.target &&
      getDistanceSquared(center, this.target.position) < aimRadius * aimRadius
    ) {
      if (this.canShoot) {
        this.canShoot = false;
        this.shoot();
      }
    } else {
      this.target = enemyManager.getClosestPointInRadius(center, aimRadius);
    }
  }

  public drawRadius(ctx: CanvasRenderingContext2D, map: GameMap) {
    const tileSize = map.getTileSize();
    const aimRadius = this.radius * tileSize;
    const { x, y } = this.position;
    const cordinatX = x + tileSize / 2;
    const cordinatY = y + tileSize / 2;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillStyle = this.color;
    ctx.arc(cordinatX, cordinatY, aimRadius, 0, 2 * Math.PI);
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
