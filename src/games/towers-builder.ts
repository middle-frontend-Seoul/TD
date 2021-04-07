import { EventBus, EventNames } from './event-bus';
import { Tower as BaseTower } from './towers';
import { Position } from './typing';
import { Move } from './move';
import { TowersMap } from './towers-map';

export class TowersBuilder {
  private move: Move;

  private map: TowersMap;

  private tower: BaseTower | null;

  protected event: () => EventBus;

  protected static instance: TowersBuilder;

  constructor(map: TowersMap, move: Move) {
    const event = new EventBus();

    this.map = map;

    this.move = move;

    this.tower = null;

    this.event = () => event;

    if (TowersBuilder.instance) {
      return TowersBuilder.instance;
    }

    this.event().on(EventNames.escape, this.onDrop);
    this.event().on(EventNames.clickInCanavs, this.clickInCanvas);

    TowersBuilder.instance = this;
  }

  protected clickInCanvas = (position: Position): void => {
    if (!this.tower) return;
    this.map.push(this.tower, position);
    this.onDrop();
  };

  public onDrag = (Tower: new (...arg: unknown[]) => BaseTower): void => {
    this.tower = new Tower();
    this.move.onDrag(this.tower);
  };

  public onDrop = (): void => {
    this.tower = null;
    this.move.onDrop();
  };
}
