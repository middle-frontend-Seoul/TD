import { Renderable } from 'games/interfaces/renderable';
import { Enemy } from 'games/enemies';
import { Tower } from 'games/towers/tower';

export abstract class Munition extends Renderable {
  abstract color: string;

  public target: Enemy;

  public isAlive = true;

  protected emitter: Tower;

  constructor(target: Enemy, emitter: Tower) {
    super({
      x: emitter.center.x,
      y: emitter.center.y,
    });
    this.target = target;
    this.emitter = emitter;
  }
}
