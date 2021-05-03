import { EntityRenderer } from 'games/interfaces/entity-renderer';
import { Munition } from 'games/munitions/munition';
import { GameMap } from 'games/game-map';

export class MunitionManager extends EntityRenderer<Munition> {
  update(map: GameMap) {
    this.entities = this.entities.filter((munition) => munition.isAlive);
    this.entities.forEach((munition) => munition.update(map));
  }
}

export const munitionManager = new MunitionManager();
