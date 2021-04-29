import { EntityRenderer } from 'games/interfaces/entity-renderer';
import { Munition } from 'games/munitions/munition';
import { GameMap } from 'games/game-map';

export class MunitionManager extends EntityRenderer<Munition> {
  update(map: GameMap) {
    this.entities.forEach((munition, idx) => {
      if (munition.isAlive) {
        munition.update(map);
      } else {
        this.entities.splice(idx, 1);
      }
    });
  }
}

export const munitionManager = new MunitionManager();
