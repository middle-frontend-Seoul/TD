import { PlacedTowers } from './placed-towers';
import { EventBus } from './event-bus';
import { Tower } from './towers';
import { GridType } from './typing';
import { GameError } from './game-error';

export const ERROR_IS_NO_PLACE = 'IS NO PLACE';

export class MoveTower {
  private x = -1;

  private y = -1;

  private isMove = false;

  private placedTowers: PlacedTowers;

  private tower: Tower | null = null;

  private size: number;

  event: () => EventBus;

  constructor(size: number, grid: GridType) {
    const event = new EventBus();

    this.size = size;
    this.placedTowers = new PlacedTowers(size, grid);

    this.event = () => event;
    this.event().on('mousemove:outcanvas', this.mousemoveOutCanvas);
    this.event().on('mousemove:incanvas', this.mousemoveInCanvas);
    this.event().on('keydown:escape', this.onDrop);
    this.event().on('click', this.click);
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    if (!this.isTowerMove()) return;

    const { image, color, radius } = this.tower as Tower;
    if (image) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillStyle = color;
      ctx.arc(
        this.x + this.size / 2,
        this.y + this.size / 2,
        radius * this.size,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
      ctx.drawImage(image, this.x, this.y);
    }
  };

  onDrag = (tower: Tower): void => {
    this.tower = tower;
    this.isMove = true;
  };

  onDrop = (): void => {
    this.isMove = false;
    this.tower = null;
  };

  private click = (): void => {
    if (!this.isTowerMove()) return;

    const res = this.placedTowers.append(this.tower as Tower, {
      x: this.x,
      y: this.y,
    });

    if (!res) {
      throw new GameError(
        'Здесь нельзя устанавливать башню',
        ERROR_IS_NO_PLACE
      );
    }
    this.onDrop();
  };

  private isTowerMove = (): boolean => {
    if (!this.isMove || this.x < 0 || this.y < 0 || !this.tower) return false;
    return true;
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
