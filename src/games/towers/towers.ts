import { Flamethrower } from './flamethrower';
import { Mortar } from './mortar';
import { Laser } from './laser';
import { Gun } from './gun';

export type GameTowers =
  | typeof Gun
  | typeof Flamethrower
  | typeof Laser
  | typeof Mortar;

export const Towers: Array<GameTowers> = [Gun, Laser, Flamethrower, Mortar];
