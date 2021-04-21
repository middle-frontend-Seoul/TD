import { InterfaceMoveMap } from '../interfaces/move-map';
import { Position } from '../typing';

type EnemyProps = {
  name: string;
  size: number;
  speed: number;
  live: number;
  livesLeft: number;
  position: Position;
};

export abstract class Enemy extends InterfaceMoveMap {
  protected name: string;

  protected live: number;

  protected livesLeft: number;

  protected size: number;

  protected speed: number;

  protected position: Position;

  constructor({ name, live, livesLeft, size, position, speed }: EnemyProps) {
    super(position);
    this.name = name;

    this.live = live;
    this.livesLeft = livesLeft;

    this.size = size;
    this.speed = speed;
    this.position = position;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  damage = (damage: number): void => {
    this.livesLeft -= damage;
  };

  isLive = (): boolean => {
    return this.livesLeft > 0;
  };

  drawLive = (ctx: CanvasRenderingContext2D): void => {
    const { x, y } = this.position;
    const size = this.size - 4;
    const live = (this.livesLeft / this.live) * 100;
    const width = size * (live / 100);

    ctx.beginPath();
    ctx.fillStyle = '#C4C4C4';
    ctx.rect(x + 2, y - 4, size, 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.rect(x + 2, y - 4, width, 2);
    ctx.fill();
  };
}
