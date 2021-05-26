import towerPathGun from 'images/tools/gun.png';

import { getDrawPosition } from 'games/helpers';
import { GameMap } from 'games/game-map';
import { munitionManager } from 'games/managers/munition-manager';
import { GunMunition } from 'games/munitions/gun-munition';
import { Tower } from './tower';

export class Gun extends Tower {
  pathImage = towerPathGun;

  name = 'Пулемёт';

  price = 15;

  color = 'rgba(82, 82, 82, 0.5)';

  radius = 3;

  damage = 2;

  reloadTime = 1500;

  protected shotBulletsCount = 3;

  protected currentShotBullet = 0;

  protected timeBetweenBullets = 80;

  protected lastTimeConsoleLog = 0;

  public update(map: GameMap) {
    if (
      this.currentShotBullet < this.shotBulletsCount &&
      this.lastShoot + this.timeBetweenBullets < performance.now()
    ) {
      this.canShoot = true;
      this.lastShoot = performance.now();
      this.currentShotBullet += 1;
    }

    if (
      this.lastShoot + this.reloadTime < performance.now() &&
      this.currentShotBullet >= 3
    ) {
      this.canShoot = true;
      this.currentShotBullet = 0;
      this.lastShoot = performance.now();
    }

    this.updateHelper(map);
  }

  draw = (ctx: CanvasRenderingContext2D, map: GameMap): void => {
    const tileSize = map.getTileSize();
    const { x, y } = this.position;

    const p60 = getDrawPosition(tileSize, 60);
    const p20 = getDrawPosition(tileSize, 20);

    ctx.beginPath();
    ctx.fillStyle = '#6B6B6B';
    ctx.rect(x + p60.offset, y, p60.width, tileSize);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#6B6B6B';
    ctx.rect(x, y + p60.offset, tileSize, p60.width);
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

  shoot() {
    if (this.target) {
      const munition = new GunMunition(this.target, this);
      munitionManager.add(munition);
    }
  }
}
