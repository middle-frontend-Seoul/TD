import { EntityRenderer } from 'games/interfaces/entity-renderer';
import { Tower } from 'games/towers/tower';
import { GameMap } from 'games/game-map';

export class TowerManager extends EntityRenderer<Tower> {
  update(map: GameMap) {
    this.entities.forEach((tower) => tower.update(map));
  }
}

export const towerManager = new TowerManager();
