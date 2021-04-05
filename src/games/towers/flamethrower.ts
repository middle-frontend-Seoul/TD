import towerPathFlamethrower from 'images/tools/flamethrower.png';

import { Tower } from './tower';

export class Flamethrower extends Tower {
  name = 'Огнемёт';

  price = 25;

  radius = 3;

  color = 'rgba(191, 94, 0, 0.5)';

  pathImage = towerPathFlamethrower;
}
