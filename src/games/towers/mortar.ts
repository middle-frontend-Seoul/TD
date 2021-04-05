import towerPathMortar from 'images/tools/mortar.png';

import { Tower } from './tower';

export class Mortar extends Tower {
  name = 'Ракеты';

  price = 60;

  radius = 3;

  color = 'rgba(134, 8, 0, 0.5)';

  pathImage = towerPathMortar;
}
