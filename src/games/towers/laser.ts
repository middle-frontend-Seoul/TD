import towerPathLaser from 'images/tools/laser.png';

import { Tower } from './tower';

export class Laser extends Tower {
  name = 'Лазер';

  price = 40;

  radius = 3;

  color = 'rgba(148, 10, 0, 0.5)';

  pathImage = towerPathLaser;
}
