import towerPathLaser from 'images/tools/laser.png';

import { getDrawPosition } from 'games/helpers';
import { GameMap } from 'games/game-map';
import { Tower } from './tower';

export class Laser extends Tower {
  pathImage = towerPathLaser;

  name = 'Лазер';

  price = 40;

  color = 'rgba(148, 10, 0, 0.5)';

  radius = 3;

  damage = 10;

  reloadTime = 1500;

  draw = (ctx: CanvasRenderingContext2D, map: GameMap): void => {
    const tileSize = map.getTileSize();
    const { x, y } = this.position;

    const p60 = getDrawPosition(tileSize, 60);
    const p20 = getDrawPosition(tileSize, 20);

    ctx.beginPath();
    ctx.fillStyle = '#320000';
    ctx.rect(x + p60.offset, y, p60.width, tileSize);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#320000';
    ctx.rect(x, y + p60.offset, tileSize, p60.width);
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

  shoot() {
    console.log('shoot', this.target);
  }
}
