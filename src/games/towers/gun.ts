import towerPathGun from 'images/tools/gun.png';

import { Tower } from './tower';
import { cloneNode } from '../helpers';

export class Gun extends Tower<Gun> {
  name = 'Пулемёт';

  price = 15;

  pathImage = towerPathGun;

  clone(): Gun {
    const subClass = new Gun(this.size);
    if (this.image) {
      subClass.image = cloneNode(this.image);
    }

    return subClass;
  }
}
