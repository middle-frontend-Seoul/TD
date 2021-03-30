import towerPathLaser from 'images/tools/laser.png';

import { Tower } from './tower';
import { cloneNode } from '../helpers';

export class Laser extends Tower<Laser> {
  name = 'Лазер';

  price = 40;

  pathImage = towerPathLaser;

  clone(): Laser {
    const subClass = new Laser(this.size);
    if (this.image) {
      subClass.image = cloneNode(this.image);
    }

    return subClass;
  }
}
