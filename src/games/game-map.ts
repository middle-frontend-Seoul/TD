import bg from 'images/bg-play.png';
import way from 'images/way-play.png';

export type GridType = (number | boolean)[];

export class GameMap {
  size: number;

  width: number;

  height: number;

  grid: GridType[];

  imgBG?: HTMLImageElement;

  imgWay?: HTMLImageElement;

  constructor(grid: GridType[], size = 30) {
    this.size = size;
    this.grid = grid;
    this.width = grid[0].length;
    this.height = grid.length;
  }

  async load(): Promise<void> {
    this.imgBG = await this.loadingImage(bg);
    this.imgWay = await this.loadingImage(way);
  }

  drawGrid(ctx: CanvasRenderingContext2D): void {
    if (!this.imgWay || !this.imgBG) {
      return;
    }

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        let image = this.imgBG;
        if (this.grid[y] && this.grid[y][x]) {
          image = this.imgWay;
        }

        ctx.drawImage(
          image,
          x * this.size,
          y * this.size,
          this.size,
          this.size
        );
      }
    }
  }

  private loadingImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((res, rej) => {
      const image = new Image();
      image.onload = () => res(image);
      image.onerror = rej;
      image.src = src;
    });
  };
}
