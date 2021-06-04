import { EntityRenderer } from 'games/interfaces/entity-renderer';
import { Enemy } from 'games/enemies';
import { GameMap } from 'games/game-map';
import { Position } from 'games/typing';
import { getDistanceSquared } from 'games/helpers';

export class EnemyManager extends EntityRenderer<Enemy> {
  getClosestPointInRadius(position: Position, radius: number) {
    let closestEnemy;
    let shortestDistanceSquared = radius * radius;

    this.entities.forEach((enemy) => {
      const distanceSquared = getDistanceSquared(enemy.position, position);

      if (distanceSquared <= shortestDistanceSquared) {
        shortestDistanceSquared = distanceSquared;
        closestEnemy = enemy;
      }
    });

    return closestEnemy;
  }

  getEnemiesInRadius(position: Position, radius: number) {
    const enemies: Array<Enemy> = [];
    const shortestDistanceSquared = radius * radius;
    this.entities.forEach((enemy) => {
      const distanceSquared = getDistanceSquared(enemy.position, position);
      if (distanceSquared <= shortestDistanceSquared) {
        enemies.push(enemy);
      }
    });
    return enemies;
  }

  getEnemiesOnLane(tower: any) {
    if (!tower.name || tower.name !== 'Лазер') {
      return null;
    }
    const enemies: Array<Enemy> = [];
    const { towers } = tower;
    for (let i = 0; i < towers.length; i += 1) {
      if (towers[i].name === 'Лазер') {
        this.entities.forEach((enemy) => {
          const x = Math.floor(enemy.position.x);
          const y = Math.floor(enemy.position.y);
          const x1 = tower.position.x;
          const y1 = tower.position.y;
          const x2 = towers[i].position.x;
          const y2 = towers[i].position.y;
          if (x1 === x2) {
            if (x === x1 && ((y <= y1 && y >= y2) || (y >= y1 && y <= y2))) {
              enemies.push(enemy);
            }
          } else if (y1 === y2) {
            if (y === y1 && ((x <= x1 && x >= x2) || (x >= x1 && x <= x2))) {
              enemies.push(enemy);
            }
          } else {
            const t = 10;
            const p = (x - x2) / (x1 - x2);
            if (Math.abs(p * y1 + (1 - p) * y2 - y) < t && p >= 0 && p <= 1) {
              enemies.push(enemy);
            }
          }
        });
      }
    }
    return enemies;
  }

  update(map: GameMap) {
    this.entities = this.entities.filter((enemy) => enemy.isAlive);
    this.entities.forEach((enemy) => enemy.update(map));
  }
}

export const enemyManager = new EnemyManager();
