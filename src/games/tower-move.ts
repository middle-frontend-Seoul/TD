import { EventBus } from './event-bus';

export class TowerMove {
  private x = -1;

  private y = -1;

  private isMove = false;

  private tower: any;

  private size: number;

  event: () => EventBus;

  constructor(size: number) {
    const event = new EventBus();

    this.size = size;

    this.event = () => event;
    this.event().on('mousemove', this.mousemove);
    this.event().on('keydown:escape', this.stop);
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    if (!this.isMove || this.x < 0 || this.y < 0) return;

    const img = this.tower.image;
    ctx.drawImage(img, this.y, this.x);
  };

  start = (tower: any): void => {
    this.tower = tower;
    this.isMove = true;
  };

  stop = (): void => {
    this.isMove = false;
  };

  mousemove = ({ x, y }: { x: number; y: number }): void => {
    if (!this.isMove) return;

    this.x = x * this.size;
    this.y = y * this.size;
  };
}
