export abstract class Enemy<SubClass extends Enemy<SubClass>> {
  abstract name: string;

  abstract live: number;

  abstract livesLeft: number;

  abstract speed: number;

  protected x: number;

  protected y: number;

  protected size: number;

  constructor(x: number, y: number, size = 30) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  damage = (damage: number): void => {
    this.livesLeft -= damage;
  };

  setPosition = (x: number, y: number): void => {
    this.x = x;
    this.y = y;
  };

  drawLive = (ctx: CanvasRenderingContext2D): void => {
    const size = this.size - 4;

    ctx.beginPath();
    ctx.fillStyle = '#C4C4C4';
    ctx.rect(this.x + 2, this.y - 4, size, 2);
    ctx.fill();

    const live = (this.livesLeft / this.live) * 100;
    const width = size * (live / 100);

    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.rect(this.x + 2, this.y - 4, width, 2);
    ctx.fill();
  };
}
