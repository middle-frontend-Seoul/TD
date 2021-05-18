import { GameMap } from 'games/game-map';
import { Renderable } from './renderable';

export class EntityRenderer<T extends Renderable> {
  protected entities: T[] = [];

  init() {
    this.entities = [];
  }

  add(entity: T) {
    this.entities.push(entity);
  }

  update(map: GameMap) {
    this.entities.forEach((entity) => entity.update(map));
  }

  draw(ctx: CanvasRenderingContext2D, map: GameMap) {
    this.entities.forEach((entity) => entity.draw(ctx, map));
  }

  getEntities(): T[] {
    return this.entities;
  }
}
