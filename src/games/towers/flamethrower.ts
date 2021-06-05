import towerPathFlamethrower from 'images/tools/flamethrower.png';

import { getDrawPosition } from 'games/helpers';
import { GameMap } from 'games/game-map';
import { Tower } from './tower';
import { munitionManager } from '../managers/munition-manager';
import { FlameMunition } from '../munitions/flame-munition';

export class Flamethrower extends Tower {
  pathImage = towerPathFlamethrower;

  name = 'Огнемёт';

  price = 30;

  color = 'rgba(191, 94, 0, 0.5)';

  radius = 2;

  damage = 1;

  reloadTime = 45;

  draw = (ctx: CanvasRenderingContext2D, map: GameMap): void => {
    const tileSize = map.getTileSize();
    const { x, y } = this.position;

    const p60 = getDrawPosition(tileSize, 60);
    const p20 = getDrawPosition(tileSize, 20);

    ctx.beginPath();
    ctx.fillStyle = '#3D0000';
    ctx.rect(x + p60.offset, y, p60.width, tileSize);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#3D0000';
    ctx.rect(x, y + p60.offset, tileSize, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#ECC301';
    ctx.rect(x + p60.offset, y + p60.offset, p60.width, p60.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#BF5E00';
    ctx.rect(x + p20.offset, y, p20.width, tileSize);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#BF5E00';
    ctx.rect(x, y + p20.offset, tileSize, p20.width);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#030100';
    ctx.rect(x + p20.offset, y + p20.offset, p20.width, p20.width);
    ctx.fill();
  };

  shoot() {
    if (this.target) {
      const munition = new FlameMunition(this.target, this);
      munitionManager.add(munition);
    }
  }
}
