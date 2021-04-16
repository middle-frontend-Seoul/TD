import towerPathGun from 'images/tools/gun.png';

import { getGridPosition } from '../helpers';
import { Position } from '../typing';
import { Tower } from './tower';

export class Gun extends Tower {
  pathImage = towerPathGun;

  constructor() {
    super({
      name: 'Пулемёт',
      price: 15,
      radius: 3,
      color: 'rgba(82, 82, 82, 0.5)',
    });
  }

  draw = (ctx: CanvasRenderingContext2D, { x, y }: Position): void => {
    const p60 = getGridPosition(this.size, 60);
    const p20 = getGridPosition(this.size, 20);

    ctx.beginPath();
    ctx.fillStyle = '#6B6B6B';
    ctx.rect(x + p60.offset, y, p60.width, this.size);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#6B6B6B';
    ctx.rect(x, y + p60.offset, this.size, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#525252';
    ctx.rect(x + p60.offset, y + p60.offset, p60.width, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#282828';
    ctx.rect(x + p20.offset, y + p60.offset, p20.width, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#282828';
    ctx.rect(x + p60.offset, y + p20.offset, p60.width, p20.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.rect(x + p20.offset, y + p20.offset, p20.width, p20.width);
    ctx.fill();
  };
}
