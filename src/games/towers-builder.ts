import { EventBus, EventNames } from './event-bus';
import { Tower as BaseTower } from './towers';
import { Position } from './typing';
import { MoveCursor } from './move-cursor';
import { TowersMap } from './towers-map';

export class TowersBuilder {
  private moveCursor: MoveCursor;

  private map: TowersMap;

  private tower: BaseTower | null;

  protected event: () => EventBus;

  protected static instance: TowersBuilder;

  constructor(map: TowersMap, moveCursor: MoveCursor) {
    const event = new EventBus();

    this.map = map;

    this.moveCursor = moveCursor;

    this.tower = null;

    this.event = () => event;

    if (TowersBuilder.instance) {
      return TowersBuilder.instance;
    }

    this.event().on(EventNames.escape, this.onDrop);
    this.event().on(EventNames.clickInCanvas, this.clickInCanvas);

    TowersBuilder.instance = this;
  }

  protected clickInCanvas = (position: Position): void => {
    if (!this.tower) return;
    this.map.push(this.tower, position);
    this.onDrop();
  };

  public onDrag = (Tower: new (...arg: unknown[]) => BaseTower): void => {
    this.tower = new Tower();
    this.moveCursor.onDrag(this.tower);
  };

  public onDrop = (): void => {
    this.tower = null;
    this.moveCursor.onDrop();
  };
}
