import towerPathFlamethrower from 'images/tools/flamethrower.png';

import { getGridPosition } from '../helpers';
import { Tower } from './tower';

export class Flamethrower extends Tower {
  pathImage = towerPathFlamethrower;

  constructor() {
    super({
      name: 'Огнемёт',
      price: 25,
      radius: 3,
      color: 'rgba(191, 94, 0, 0.5)',
    });
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    const p60 = getGridPosition(this.size, 60);
    const p20 = getGridPosition(this.size, 20);

    ctx.beginPath();
    ctx.fillStyle = '#3D0000';
    ctx.rect(0 + p60.offset, 0, p60.width, this.size);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#3D0000';
    ctx.rect(0, 0 + p60.offset, this.size, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#ECC301';
    ctx.rect(0 + p60.offset, 0 + p60.offset, p60.width, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#BF5E00';
    ctx.rect(0 + p20.offset, 0, p20.width, this.size);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#BF5E00';
    ctx.rect(0, 0 + p20.offset, this.size, p20.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#030100';
    ctx.rect(0 + p20.offset, 0 + p20.offset, p20.width, p20.width);
    ctx.fill();
  };
}
