import towerPathFlamethrower from 'images/tools/flamethrower.png';

import { Tower } from './tower';
import { cloneNode } from '../helpers';

export class Flamethrower extends Tower<Flamethrower> {
  name = 'Огнемёт';

  price = 25;

  radius = 3;

  color = 'rgba(191, 94, 0, 0.5)';

  pathImage = towerPathFlamethrower;

  clone(): Flamethrower {
    const subClass = new Flamethrower(this.size);
    if (this.image) {
      subClass.image = cloneNode(this.image);
    }

    return subClass;
  }
}
