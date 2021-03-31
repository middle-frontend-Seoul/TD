import { Flamethrower } from './flamethrower';
import { Mortar } from './mortar';
import { Tower } from './tower';
import { Laser } from './laser';
import { Gun } from './gun';

export type TowerType = Gun | Flamethrower | Mortar | Laser;

export { Tower, Flamethrower, Mortar, Laser, Gun };
