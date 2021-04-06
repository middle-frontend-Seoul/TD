export type TowerProps = {
  size?: number;
  name: string;
  price: number;
  color: string;
  radius: number;
};

export abstract class Tower {
  abstract pathImage: string;

  protected size: number;

  protected name: string;

  protected price: number;

  protected color: string;

  protected radius: number;

  constructor(props: TowerProps) {
    const { size = 30, name, price, color, radius } = props;

    this.size = size;
    this.name = name;
    this.price = price;
    this.color = color;
    this.radius = radius;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  public drawRadius = (ctx: CanvasRenderingContext2D): void => {
    const cordinatX = 0 + this.size / 2;
    const cordinatY = 0 + this.size / 2;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillStyle = this.color;
    ctx.arc(cordinatX, cordinatY, this.radius * this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  };
}
