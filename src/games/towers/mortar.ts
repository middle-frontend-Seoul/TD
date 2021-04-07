import towerPathMortar from 'images/tools/mortar.png';

import { getGridPosition } from '../helpers';
import { Position } from '../typing';
import { Tower } from './tower';

export class Mortar extends Tower {
  pathImage = towerPathMortar;

  constructor() {
    super({
      name: 'Ракеты',
      price: 60,
      radius: 3,
      color: 'rgba(134, 8, 0, 0.5)',
    });
  }

  draw = (ctx: CanvasRenderingContext2D, { x, y }: Position): void => {
    const p60 = getGridPosition(this.size, 60);
    const p20 = getGridPosition(this.size, 20);

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.rect(x + p60.offset, y, p60.width, this.size);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#000000';
    ctx.rect(x, y + p60.offset, this.size, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#860000';
    ctx.rect(x + p60.offset, y + p60.offset, p60.width, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FF8A00';
    ctx.rect(x + p20.offset, y + p60.offset, p20.width, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FF8A00';
    ctx.rect(x + p60.offset, y + p20.offset, p60.width, p20.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#FFC700';
    ctx.rect(x + p20.offset, y + p20.offset, p20.width, p20.width);
    ctx.fill();
  };
}
