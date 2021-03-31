import { EventBus } from './event-bus';
import { TowerType } from './towers';

export class TowerMove {
  private x = -1;

  private y = -1;

  private isMove = false;

  private tower: TowerType | null = null;

  private size: number;

  event: () => EventBus;

  constructor(size: number) {
    const event = new EventBus();

    this.size = size;

    this.event = () => event;
    this.event().on('mousemove:outcanvas', this.mousemoveOutCanvas);
    this.event().on('mousemove:incanvas', this.mousemoveInCanvas);
    this.event().on('keydown:escape', this.stop);
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    if (!this.isMove || this.x < 0 || this.y < 0 || !this.tower) return;

    const { image, color, radius } = this.tower;
    if (image) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillStyle = color;
      ctx.arc(
        this.y + this.size / 2,
        this.x + this.size / 2,
        radius * this.size,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
      ctx.drawImage(image, this.y, this.x);
    }
  };

  start = (tower: TowerType): void => {
    this.tower = tower;
    this.isMove = true;
  };

  stop = (): void => {
    this.isMove = false;
    this.tower = null;
  };

  private mousemoveInCanvas = ({ x, y }: { x: number; y: number }): void => {
    if (!this.isMove) return;

    this.x = x * this.size;
    this.y = y * this.size;
  };

  private mousemoveOutCanvas = (): void => {
    this.x = -1;
    this.y = -1;
  };
}
