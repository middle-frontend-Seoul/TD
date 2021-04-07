import towerPathLaser from 'images/tools/laser.png';

import { getGridPosition } from '../helpers';
import { Position } from '../typing';
import { Tower } from './tower';

export class Laser extends Tower {
  pathImage = towerPathLaser;

  constructor() {
    super({
      name: 'Лазер',
      price: 40,
      radius: 3,
      color: 'rgba(148, 10, 0, 0.5)',
    });
  }

  draw = (ctx: CanvasRenderingContext2D, { x, y }: Position): void => {
    const p60 = getGridPosition(this.size, 60);
    const p20 = getGridPosition(this.size, 20);

    ctx.beginPath();
    ctx.fillStyle = '#320000';
    ctx.rect(x + p60.offset, y, p60.width, this.size);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#320000';
    ctx.rect(x, y + p60.offset, this.size, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#940000';
    ctx.rect(x + p60.offset, y + p60.offset, p60.width, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.rect(x + p20.offset, y + p60.offset, p20.width, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.rect(x + p60.offset, y + p20.offset, p60.width, p20.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FF0000';
    ctx.rect(x + p20.offset, y + p20.offset, p20.width, p20.width);
    ctx.fill();
  };
}
