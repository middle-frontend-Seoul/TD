import { InterfaceMoveMap } from './interfaces/move-map';

export class MoveMap<T extends InterfaceMoveMap> {
  protected entities: T[] = [];

  public push = (entity: T): void => {
    this.entities.push(entity);
  };

  public draw = (ctx: CanvasRenderingContext2D): void => {
    this.entities.forEach((entity) => entity.draw(ctx));
  };
}
