import { Position } from '../typing';
import { InterfaceMoveCursor } from '../interfaces/move-cursor';

export type TowerProps = {
  size?: number;
  name: string;
  price: number;
  color: string;
  radius: number;
};

export abstract class Tower extends InterfaceMoveCursor {
  abstract pathImage: string;

  protected size: number;

  protected name: string;

  protected price: number;

  protected color: string;

  protected radius: number;

  constructor(props: TowerProps) {
    super();
    const { size = 30, name, price, color, radius } = props;

    this.size = size;
    this.name = name;
    this.price = price;
    this.color = color;
    this.radius = radius;
  }

  abstract draw(ctx: CanvasRenderingContext2D, position: Position): void;

  public drawRadius = (
    ctx: CanvasRenderingContext2D,
    { x, y }: Position
  ): void => {
    const cordinatX = x + this.size / 2;
    const cordinatY = y + this.size / 2;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillStyle = this.color;
    ctx.arc(cordinatX, cordinatY, this.radius * this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}
