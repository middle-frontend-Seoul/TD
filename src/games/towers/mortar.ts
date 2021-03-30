import towerPathMortar from 'images/tools/mortar.png';

import { Tower } from './tower';
import { cloneNode } from '../helpers';

export class Mortar extends Tower<Mortar> {
  name = 'Ракеты';

  price = 60;

  pathImage = towerPathMortar;

  clone(): Mortar {
    const subClass = new Mortar(this.size);
    if (this.image) {
      subClass.image = cloneNode(this.image);
    }

    return subClass;
  }
}
