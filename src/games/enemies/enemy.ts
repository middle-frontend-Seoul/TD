import { Renderable } from 'games/interfaces/renderable';
import { Position } from 'games/typing';
import { EventBus, EventNames } from 'games/event-bus';
import { GameMap } from 'games/game-map';

export type Direction = 'top' | 'left' | 'right' | 'bottom';

export abstract class Enemy extends Renderable {
  protected event: () => EventBus;

  protected abstract name: string;

  protected abstract speed: number;

  protected abstract live: number;

  protected abstract damage: number;

  protected abstract cash: number;

  protected damageTaken = 0;

  protected direction: Direction = 'right'; // TODO - после ввода path в Map direction уже будет не нужно

  public isAlive = true;

  constructor(position: Position = { x: 0, y: 0 }) {
    super(position);
    const event = new EventBus();
    this.event = () => event;
  }

  update(map: GameMap) {
    if (this.position.x > map.getEndPosition().x) {
      map.handleDamage(this.damage);
      this.isAlive = false;
    } else {
      const tileSize = map.getTileSize();
      const grid = map.getGrid();
      const hashAntonymTrackway = {
        right: 'left',
        left: 'right',
        top: 'bottom',
        bottom: 'top',
      };

      const { x, y } = this.position;

      const gridXLeftTopPoint = Math.floor(x / tileSize);
      const gridYLeftTopPoint = Math.floor(y / tileSize);

      const gridXRightBottomPoint = Math.floor((x + tileSize - 1) / tileSize);
      const gridYRightBottomPoint = Math.floor((y + tileSize - 1) / tileSize);

      const gridPosition = { x: gridXLeftTopPoint, y: gridYLeftTopPoint };

      const trackwayIsClear = {
        right: grid[gridPosition.y][gridPosition.x + 1] === 1,
        top: grid[gridPosition.y - 1][gridPosition.x] === 1,
        left: grid[gridPosition.y][gridPosition.x - 1] === 1,
        bottom: grid[gridPosition.y + 1][gridPosition.x] === 1,
      };

      const keys = Object.keys(trackwayIsClear);
      while (keys.length) {
        if (trackwayIsClear[this.direction]) {
          break;
        }

        const key = keys.shift() as keyof typeof trackwayIsClear;
        const isClear = trackwayIsClear[key];

        if (
          isClear &&
          hashAntonymTrackway[this.direction] !== key &&
          gridYLeftTopPoint === gridYRightBottomPoint &&
          gridXLeftTopPoint === gridXRightBottomPoint
        ) {
          this.direction = key;
          break;
        }
      }

      // eslint-disable-next-line default-case
      switch (this.direction) {
        case 'top':
          this.setPositionY(y - this.speed);
          break;
        case 'left':
          this.setPositionX(x - this.speed);
          break;
        case 'right':
          this.setPositionX(x + this.speed);
          break;
        case 'bottom':
          this.setPositionY(y + this.speed);
          break;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, map: GameMap) {
    if (this.damageTaken > 0) {
      this.drawLive(ctx, map);
    }
  }

  public receiveDamage = (damage: number): void => {
    this.damageTaken += damage;
    if (this.damageTaken >= this.live && this.isAlive) {
      this.isAlive = false;
      this.onDie();
    }
  };

  private onDie = () => {
    this.event().emit(EventNames.ScoreAdd, this.cash);
  };

  private drawLive = (ctx: CanvasRenderingContext2D, map: GameMap): void => {
    const tileSize = map.getTileSize();
    const { x, y } = this.position;
    const barSize = tileSize - 4;
    const live = (1 - this.damageTaken / this.live) * 100;
    const width = barSize * (live / 100);

    ctx.beginPath();
    ctx.fillStyle = '#C4C4C4';
    ctx.rect(x + 2, y - 4, barSize, 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.rect(x + 2, y - 4, width, 2);
    ctx.fill();
  };

  public getDamage = (): number => {
    return this.damage;
  };
}
