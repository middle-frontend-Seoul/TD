import towerPathGun from 'images/tools/gun.png';

import { Tower } from './tower';

export class Gun extends Tower {
  name = 'Пулемёт';

  price = 15;

  radius = 3;

  color = 'rgba(82, 82, 82, 0.5)';

  pathImage = towerPathGun;
}
