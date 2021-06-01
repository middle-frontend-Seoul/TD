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

  update(map: GameMap) {
    this.entities = this.entities.filter((enemy) => enemy.isAlive);
    this.entities.forEach((enemy) => enemy.update(map));
  }
}

export const enemyManager = new EnemyManager();
